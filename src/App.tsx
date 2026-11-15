import React, { useState, useEffect } from 'react';
import { LiquidGlassView } from './components/liquid-glass/LiquidGlassView';
import { BrochurePreview } from './components/brochure/BrochurePreview';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'web' | 'brochure'>(() => {
    return window.location.search.includes('view=brochure') ? 'brochure' : 'web';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.search.includes('view=brochure')) {
        setViewMode('brochure');
      } else {
        setViewMode('web');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleViewMode = (mode: 'web' | 'brochure') => {
    setViewMode(mode);
    const url = new URL(window.location.href);
    if (mode === 'brochure') {
      url.searchParams.set('view', 'brochure');
    } else {
      url.searchParams.delete('view');
    }
    window.history.pushState({}, '', url.toString());
  };

  if (viewMode === 'brochure') {
    return <BrochurePreview onBackToWeb={() => toggleViewMode('web')} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white selection:text-black relative">
      <LiquidGlassView />
    </div>
  );
};

export default App;
