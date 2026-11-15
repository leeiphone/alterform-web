const { spawn } = require('child_process');

async function main() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9777',
    '--user-data-dir=/Users/leemacpro/.gemini/antigravity/brain/616a0238-3b41-4728-8ec6-c6d2016604f3/scratch/chrome-debug',
    '--use-gl=angle',
    '--use-angle=metal',
    '--no-sandbox',
    '--window-size=1440,960',
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch('http://127.0.0.1:9777/json/version');
      const json = await res.json();
      wsUrl = json.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  const ws = new WebSocket(wsUrl);
  let id = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };
  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };
  if (ws.readyState !== 1) {
    await new Promise(r => ws.onopen = r);
  }

  const target = await send('Target.createTarget', { url: 'about:blank' });
  const pageWsUrl = `ws://127.0.0.1:9777/devtools/page/${target.result.targetId}`;
  const pageWs = new WebSocket(pageWsUrl);

  const pagePending = new Map();
  let pageId = 1;
  pageWs.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('CONSOLE:', msg.params.type, msg.params.args?.map(a => a.value || a.description).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      console.error('EXCEPTION:', msg.params.exceptionDetails?.text, msg.params.exceptionDetails?.exception?.description);
    }
    if (msg.id && pagePending.has(msg.id)) {
      pagePending.get(msg.id)(msg);
      pagePending.delete(msg.id);
    }
  };
  const pageSend = (method, params = {}) => {
    return new Promise((resolve) => {
      const msgId = pageId++;
      pagePending.set(msgId, resolve);
      pageWs.send(JSON.stringify({ id: msgId, method, params }));
    });
  };
  if (pageWs.readyState !== 1) {
    await new Promise(r => pageWs.onopen = r);
  }

  await pageSend('Page.enable');
  await pageSend('Runtime.enable');

  await pageSend('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  const info1 = await pageSend('Runtime.evaluate', {
    expression: `
      ({
        cardsCount: document.querySelectorAll('.border-glow-card').length,
        bodyHeight: document.body.scrollHeight,
        scrollY: window.scrollY
      })
    `,
    returnByValue: true
  });
  console.log('Before click:', info1.result?.result?.value);

  // Click card
  const info2 = await pageSend('Runtime.evaluate', {
    expression: `
      (function() {
        const cards = Array.from(document.querySelectorAll('.border-glow-card'));
        const crumple = cards.find(c => c.innerText.includes('CRUMPLE'));
        if (crumple) {
          crumple.click();
          return 'clicked crumple';
        }
        return 'not found';
      })()
    `,
    returnByValue: true
  });
  console.log('Click result:', info2.result?.result?.value);

  await new Promise(r => setTimeout(r, 4000));

  const info3 = await pageSend('Runtime.evaluate', {
    expression: `
      ({
        modalPresent: !!document.querySelector('.fixed.inset-0.z-50'),
        canvasPresent: !!document.querySelector('canvas'),
        imgPresent: !!document.querySelector('img[alt*="CRUMPLE"]'),
        modalText: document.querySelector('.fixed.inset-0.z-50')?.innerText?.slice(0, 200)
      })
    `,
    returnByValue: true
  });
  console.log('After click:', info3.result?.result?.value);

  const shot = await pageSend('Page.captureScreenshot', { format: 'png' });
  const fs = require('fs');
  fs.writeFileSync('/Users/leemacpro/.gemini/antigravity/brain/616a0238-3b41-4728-8ec6-c6d2016604f3/modal_crumple_verified.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved screenshot to modal_crumple_verified.png');

  chromeProc.kill();
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
