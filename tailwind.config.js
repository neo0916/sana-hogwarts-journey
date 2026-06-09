/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                hufflepuff: {
                    gold: '#f59e0b',
                    dark: '#1e1b4b',
                }
            }
        },
    },
    plugins: [],
}