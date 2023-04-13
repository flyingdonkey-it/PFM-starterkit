const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // THEME
    // To easily see what styles are used where, you can search the codebase for `text-primary-bold` e.g.
    // For more information on how to configure this TailwindCSS theme, go to https://tailwindcss.com/docs/theme

    colors: {
      // BRAND COLOURS
      // These are your product brand colours. Tweak these to get a branded experience out-of-the-box.

      // Primary brand colours
      primary: {
        // Subtle
        subtle: '#F1F0FF', // <Button variant="subtle"/> bg, and radio options e.g.
        'subtle-darker': '#E8E5FF', // <Button variant="subtle"/> :hover bg
        'subtle-darkest': '#DEDBFF', // <Button variant="subtle"/> :active bg
        'subtle-accent': '#E0EAFF',

        // Bold
        bold: '#4A56E2', // <Button variant="bold"/> bg, and primary-bold -> primary-accent bg gradients e.g.
        'bold-darker': '#1400FE', // Links (darker to provide more contrast)

        // Accent
        accent: '#1525DE', // primary-bold to primary-accent bg gradient e.g.
        'input-accent': 'rgba(231, 239, 255, 0.61)'
      },

      // Secondary brand colours
      secondary: {
        // Bold
        'bold-lighter': '#34F1CF', // icons on dark bg (lighter to provide more contrast)
        bold: '#10EDC5', // primary-bold to secondary-bold bg gradients e.g.
        'bold-darker': '#0FD7B3', // icons on light bg (darker to provide more contrast)
      },

      // FUNCTIONAL COLOURS
      // Colours that are not necessarily tied to your products brand, but are heavily used to style the UI.

      // Base UI colours
      transparent: 'transparent',
      current: 'currentColor', // svgs to be able to grab the text-{color} as stroke- or fill colour
      black: '#000217', // default text colour
      white: '#FFFFFF', // default bg colour of the /account-verification flow, <Button variant="inverted"/> e.g.
      header: '#FEFEFE', // header bg colour of the /personal-finance flow
      footer: '#4A56E2', // footer bg colour of the /personal-finance flow
      menu: '#FDFDFD', // menu bg colour of the /personal-finance flow
      blue: '#4A56E2', // text colour of the /personal-finance flow
      'border-color': 'rgba(231, 239, 255, 0.61)',
      overlay: 'rgba(80, 80, 80, 0.2)',
      'green-link': '#24CCA7',
      'mobile-border-color': '#E0EAFF',
      'list-item-color': 'rgba(231, 239, 255, 0.61)',

      // Neutral UI colours
      neutral: {
        subtle: '#F5F8F9', // subtle backgrounds to contrast with default white bg e.g.
        'subtle-darker': '#EBEEEF', // disabled bg colour e.g.
        'subtle-alternate': '#FEFEFE80',
        dim: '#DEE4E7', // border, divide colour
        'dim-darker': '#BECBD0', // form input border, radio circles e.g.
        muted: '#7E888E', // muted icons, e.g. in <SearchInput />
        'muted-darker': '#4F6772', // muted text (darker to provide more contrast)
      },

      // Critical UI colours
      critical: {
        // Subtle
        subtle: '#FFE9EB', // ErrorMessage and critical Toast background e.g.

        // Bold
        bold: '#E8001C', // <Button variant="critical"/> bg, error border colour e.g.
        'bold-darker': '#A30014', // error message text colour (darker to provide more contrast)
      },

      // Success UI colours
      success: {
        // Subtle
        subtle: '#D6FFEB', // Success Toast background e.g.

        // Bold
        bold: '#00BD62', // Success Toast border and icon colour e.g.
      },
    },

    // FONT
    // Changing font makes a big difference to the branded experience of your product.
    // To change font go to /styles.css and import the font you want.
    // Font-weights used through-out this example app are:
    // 400 (default), 500 (font-medium), and 600 (font-semibold).
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },

    fontSize: {
      '2xl2': ['24px', '29px'],
      'sm2': ['14px', '17px'],
      'sm3': ['15px', '18.15px'],
      'base2': ['16px', '19px'],
      'xs': ['12px', '15px'],
      'xs2': ['10px', '12px'],
      'xl': ['20px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['30px', '36px']
    },

    extend: {
      animation: {
        'ping-slow': 'pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        'mobile-main': 'linear-gradient(180deg, #FEFEFE 0%, #F5F5F5 100%)',
      },
      boxShadow: {
        'shead': '0px 0px 20px rgba(0, 0, 0, 0.1)',
        'smenu': '0px 4px 4px rgba(0, 0, 0, 0.1)'
      },
      height: {
       '40': '10rem',
       '80': '20rem',
      },
      keyframes: {
        pingSlow: {
          '75%, 100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
      },
      width: {
        '18': '4.5rem',
        '116': '29rem'
      }
    },
  },
  plugins: [],
};
