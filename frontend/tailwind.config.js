/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        beige: "#F7F2E7",
        gold: "#C5A25A",
        "deep-brown": "#3E2C20",
        "soft-white": "#FFFFFF",
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ['"Poppins"', "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
}
