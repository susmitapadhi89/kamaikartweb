/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        link: "#2563EB", // Link color
        danger: "#DC2626", // Red
        background: "#F3F4F6", // Light gray
        fontcolourwhite: "rgba(255, 255, 255, 1)", // Light gray
        fontcolourblack: "#000000ff",
        fontcolourgray: "#242424ff", // Gray
        fontcolourlightgray: "#9CA3AF", // Light gray
      },
      fontSize: {
        xxs: "0.70rem", // extra small
        xs: "0.75rem", // small
        sm: "0.875rem", // normal small
        base: "1rem", // default
        lg: "1.125rem", // large
        xl: "1.25rem", // extra large
        "2xl": "1.5rem", // bigger
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

      backgroundImage: {
        sidebarbg: "linear-gradient(to bottom, #111827, #1f2937)",
        showdetailbg: "linear-gradient(to bottom, #1f2937, #111827)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        xxl: "2rem",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
