/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0A0F1E',
        surface: '#111827',
        panel: '#1A2235',
        border: '#1E2D45',
        accent: '#00E5B0',
        warn: '#F59E0B',
        danger: '#EF4444',
        safe: '#10B981',
        text: {
          primary: '#F0F4FF',
          secondary: '#8899BB',
          muted: '#4A5568',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
