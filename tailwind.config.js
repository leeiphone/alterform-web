/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0B0D11",
          card: "#12151B",
          cardHover: "#181C24",
          border: "#20252F",
          steel: "#14161C",
          gray: "#7D848E",
          lightGray: "#9AA1AB",
          muted: "#4A5260",
          plum: "#6C2E91",
          inkblue: "#33477E",
          oxide: "#A34532",
          bone: "#C9BFAE",
          white: "#F8FAFC",
        }
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Pretendard Variable"', 'Pretendard', 'sans-serif'],
        heading: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        body: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'widest-brand': '0.25em',
        'loose-brand': '0.35em',
      }
    },
  },
  plugins: [],
}
