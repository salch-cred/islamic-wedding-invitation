/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFF0",
        cream: "#FFFDD0",
        "soft-black": "#1A1A1A",
        "champagne-gold": {
          DEFAULT: "#D4AF37",
          light: "#F3E5AB",
          dark: "#B8960C",
          50: "#FCF9EC",
          100: "#F7F0D0",
          200: "#EEDFA4",
          300: "#E5CD78",
          400: "#DCBC4C",
          500: "#D4AF37",
          600: "#B8960C",
          700: "#8F7409",
          800: "#665306",
          900: "#3D3204",
        },
        maroon: {
          50: "#FAF0F2",
          100: "#F2D8DE",
          200: "#E3B1BC",
          300: "#D08595",
          400: "#BC596E",
          500: "#9E2A43",
          600: "#801B2E",
          700: "#631526",
          800: "#480C17",
          900: "#2B060D",
        },
        emerald: {
          islamic: "#134e3f",
          dark: "#0b3329",
        }
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        calligraphy: ['Great Vibes', 'cursive'],
        elegant: ['Cormorant Garamond', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        'float-slow': "float 9s ease-in-out infinite",
        'pulse-subtle': "pulseSubtle 2.5s ease-in-out infinite",
        'shimmer': "shimmer 2.5s infinite linear",
        'spin-slow': "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      }
    },
  },
  plugins: [],
}
