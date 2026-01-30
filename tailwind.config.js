/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                gold: {
                    500: '#D4AF37',
                    600: '#AA8C2C',
                }
            },
            animation: {
                'open-envelope': 'openEnvelope 2s forwards',
            }
        },
    },
    plugins: [],
};
