/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg:       '#F8F9FA',
        surface:  '#EAE0D5',
        surface2: '#F2EBE0',
        ink:      '#000000',
        paper:    '#FFFFFF',
        hairline: '#D9D9D9',
        fg1:      '#000000',
        fg2:      '#404040',
        fg3:      '#6B6B6B',
        plum:     '#602C66',
        plumDeep: '#4A2150',
        plumTint: '#EFE6F0',
        success:  '#1F7A4D',
        warning:  '#B5752A',
        error:    '#B33A3A',
      },
      borderRadius: {
        'xs':   '8px',
        'sm':   '10px',
        'md':   '12px',
        'lg':   '16px',
        'xl':   '22px',
        '2xl':  '28px',
        'pill': '999px',
      },
      fontFamily: {
        display: ['BebasNeue'],
        body:    ['Inter', 'system-ui'],
      },
    },
  },
  plugins: [],
};
