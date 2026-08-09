import type { Config } from "tailwindcss";

// Brand palette sampled directly from the live drillmaster.sk (Aug 2026).
// Primary red = rgb(210, 5, 30). The site is a black / white / red system.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#D2051E", // sampled from live site
          dark: "#A80418",
          light: "#EC0202", // secondary red used in a few accents
        },
        ink: {
          DEFAULT: "#000000",
          900: "#211F1F", // dark bar / footer (sampled from live site)
          700: "#4A4A4A",
          400: "#9C9C9C",
          200: "#E8EAED",
          100: "#F5F5F5",
          50: "#F0F0F0", // top-bar / divider grey on the live site
        },
      },
      fontFamily: {
        // Live site uses Inter (headings + body).
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        // Padding is set in globals.css with a clamp() so it scales with the
        // viewport; this is only the floor for anything that misses that rule.
        padding: "1rem",
        // ONE entry on purpose. Tailwind's container uses each entry as
        // "from this viewport, cap at this width", so declaring the whole
        // sm/md/lg/xl ladder makes the container step down to 1024 between
        // 1024 and the next breakpoint — which ADDS side padding on exactly
        // the mid-size windows most people browse in. With a single entry the
        // container is fluid all the way up and only caps at the end.
        screens: { "2xl": "1520px" },
      },
    },
  },
  plugins: [],
};

export default config;
