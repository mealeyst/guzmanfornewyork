/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: "#0a1f44",
                    red: "#c8102e",
                    gold: "#d4af37",
                    light: "#f4f6f9",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Oswald", "sans-serif"],
            },
        },
    },
    plugins: [],
};
