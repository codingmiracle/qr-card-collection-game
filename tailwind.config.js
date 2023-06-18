/** @type {plugin | ((options?: Partial<{strategy: "base" | "class"}>) => {handler: () => void})} */
const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': {
          500: 'rgb(33 150 243)',
          600: 'rgb(30 111 177)',
          tr_50: 'rgb(30 111 177 0.5)'
        }
      }
    },
  },
  darkMode: 'media',
  plugins: [forms],
}
