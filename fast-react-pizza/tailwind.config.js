/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      smartphone: "320px",
      // => @media (min-width: 320px) { ... }
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      sans: ["Robot Mono", "monospace"],
    },
  },

  semi: false,
  singleQuote: true,
  trailingComma: "all",
  pluginSearchDirs: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["^@", "^[a-zA-Z0-9-]+", "^[./]"],
};
