import type { Config } from 'tailwindcss'

// Tokens from the TU Microfund design system (tokens/colors.css, typography.css, spacing.css).
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#FCEE64', deep: '#F3DC35', ink: '#574C00', pale: '#FFF6BF' },
        ink: { DEFAULT: '#111010', 2: '#3A3A38', 3: '#6B6C67', 4: '#9A9B95' },
        paper: '#FFFFFF',
        stone: { DEFAULT: '#EEEFEA', 2: '#E2E4DE' },
        hairline: '#D5D6D0',
        mint: '#B1FBB2',
        lavender: '#B6AFFA',
        cyan: '#67EBFF',
        coral: { DEFAULT: '#F47855', pale: '#FDD9CD', text: '#B23A1A' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderWidth: { DEFAULT: '1.5px', bar: '4px' },
      borderRadius: { md: '8px', lg: '12px' },
      letterSpacing: { eyebrow: '0.22em', label: '0.14em', tight: '-0.02em' },
      maxWidth: { container: '1120px' },
      transitionTimingFunction: { brand: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
}

export default config
