/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0d1117',
          'bg-secondary': '#161b22',
          'bg-tertiary': '#21262d',
          border: '#30363d',
          text: '#e6edf3',
          'text-muted': '#8b949e',
        },
        syntax: {
          keyword: '#c678dd',
          string: '#98c379',
          function: '#61afef',
          comment: '#5c6370',
          number: '#d19a66',
          constant: '#e06c75',
          variable: '#56b6c2',
        },
        brand: '#00cafe',
        control: {
          red: '#ff5f56',
          yellow: '#ffbd2e',
          green: '#27c93f',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 202, 254, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 202, 254, 0.4)' },
        },
      },
      boxShadow: {
        'terminal': '0 0 0 1px rgba(48, 54, 61, 0.5), 0 16px 68px rgba(0, 0, 0, 0.55)',
        'terminal-glow': '0 0 20px rgba(0, 202, 254, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
