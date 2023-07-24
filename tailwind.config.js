/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "chat-pattern": "url('./splash.jpg')",
        "chat-background": "url('./src/assets/image-placeholder.png')",
      },
      spacing: {
        128: "32rem",
      },
      width: {
        128: "32rem",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
