/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./resources/views/**/*.blade.php', './resources/js/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        chalk: '#D8E1EE',
        ink: '#14213D',
        night: '#0A101C',
        cobalt: '#1B3BD6',
        sky: '#9DB8FF',
      },
    },
  },
};
