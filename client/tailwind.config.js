const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './public/index.html',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                blue: {
                    50: '#e8f5ff',
                    100: '#d5ecff',
                    200: '#b3daff',
                    300: '#85bfff',
                    400: '#5695ff',
                    500: '#2f6bff',
                    600: '#0c3bff',
                    700: '#0432ff',
                    800: '#062dcd',
                    900: '#10309f',
                    950: '#0a1a5c',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
