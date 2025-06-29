/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
    "./core/**/*.{js,jsx,ts,tsx}",
    "./core/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      mobile: "360px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      "desktop-lg": "1536px",
      "desktop-xl": "1920px",
    },
    extend: {
      scale: {
        120: "1.2",
        150: "1.5",
        160: "1.6",
        170: "1.7",
        180: "1.8",
      },
      lineHeight: {
        16: "16px", // Custom line height
      },
      zIndex: {
        99: "99",
        999: "999",
      },
      spacing: {
        30: "120px",
        50: "200px",
      },
      fontFamily: {
        exo: ['"Exo 2"'],
        beVietnamPro: ['"BeVietnamPro"'],
        inter: ['"Inter"'],
      },
      fontSize: {
        8: "32px",
        12: "12px",
      },
      fontStyle: {
        italic: "italic",
        normal: "normal",
      },
      colors: {
        "custom-white": {
          10: "rgba(255, 255, 255, 0.1)",
          20: "#ffffff33",
        },
        "blue-VNG": "rgba(0, 104, 255, 1)",
        orange: {
          1: "rgba(240, 90, 34, 1)",
          2: "rgba(245, 111, 34, 1)",
          3: "rgba(250, 133, 34, 1)",
          4: "rgba(255, 154, 34, 1)",
          "very-light": "rgba(255, 245, 238, 1)",
        },
        "brand-orange": {
          DEFAULT: "rgba(240, 90, 34, 1)", // Primary color
          1: "rgba(240, 90, 34, 1)",
          2: "rgba(246, 152, 117, 1)",
          3: "rgba(249, 193, 172, 1)",
          4: "rgba(253, 234, 227, 1)",
          5: "rgba(208, 76, 26, 1)",
          75: "rgba(240, 90, 34, 0.75)", // 75% opacity
          50: "rgba(240, 90, 34, 0.5)", // 50% opacity
          25: "rgba(240, 90, 34, 0.25)", // 25% opacity
        },
        "dark-orange": "#D04C1A",
        yellow: {
          "warning-2": "rgba(239, 196, 121, 1)",
          "warning-4": "#FFFBDF",
        },
        accent: {
          DEFAULT: "#5045e5", // Accent color
          75: "rgba(80, 69, 229, 0.75)", // 75% opacity
          50: "rgba(80, 69, 229, 0.5)", // 50% opacity
          25: "rgba(80, 69, 229, 0.25)", // 25% opacity
        },
        secondary: {
          DEFAULT: "#02ebad", // Secondary color
          75: "rgba(2, 235, 173, 0.75)", // 75% opacity
          50: "rgba(2, 235, 173, 0.5)", // 50% opacity
          25: "rgba(2, 235, 173, 0.25)", // 25% opacity
        },
        gray: {
          DEFAULT: "#333333", // Default gray
          5: "#f0f0f0", // 5% shade
          10: "#e7e7e7", // 10% shade
          20: "#c5c5c5", // Original gray-20
          30: "#888888", // 30% shade
          "custom-50": "rgba(133, 133, 133, 1)",
          40: "#999999", // 40% shade
          50: "#aaaaaa", // 50% shade
          60: "#636363", // Adjusted gray-60
          70: "#cccccc", // 70% shade
          80: "#dddddd", // 80% shade
          90: "#212121", // 90% shade
          100: "#f8f8f8", // 100% shade
        },
        green: {
          "positive-1": "rgba(40, 200, 50, 1)",
          "positive-4": "#E4F8E5",
        },
        red: {
          "negative-1": "rgba(240, 0, 0, 1)",
          "negative-2": "rgba(246, 96, 96, 1)",
          "negative-3": "rgba(249, 159, 159, 1)",
          "negative-4": "rgba(253, 223, 223, 1)",
          "negative-5": "rgba(203, 0, 0, 1)",
        },
        trust: {
          "blue-1": "#006EFF",
          "blue-2": "#60A4FF",
          "blue-3": "#9FC9FF",
          "blue-4": "#DFEDFF",
          "blue-5": "#0051bb",
          "custom-blue-1": "#002171",
        },
        "sub-brand": {
          "cyan-1": "rgba(60, 170, 200, 1)",
          "cyan-2": "#6dbfd6",
          "cyan-3": "#9ed4e3",
          "cyan-4": "#CEEAF1",
        },
      },
      keyframes: {
        "title-fade": {
          "0%": {
            opacity: "0",
            top: "50%",
            transform: "translate(-50%, -50%)",
          },
          "100%": {
            opacity: "1",
            top: "40px",
            transform: "translate(-50%, 0)",
          },
        },
        modalSlideUp: {
          "0%": {
            transform: "translateY(100dvh)",
          },
          "100%": {
            transform: "translateY(calc(100vh-100%))",
          },
        },
        modalSlideUpFull: {
          "0%": {
            transform: "translateY(100dvh)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        modalSlideDown: {
          "0%": {
            transform: "translateY(calc(100vh-100%))",
          },
          "100%": {
            transform: "translateY(100dvh)",
          },
        },
        modalSlideDownFull: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(100dvh)",
          },
        },
      },
      animation: {
        "title-fade": "title-fade 150ms ease-in forwards",
        "modal-slide-up":
          "modalSlideUp 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "modal-slide-down":
          "modalSlideDown 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "modal-slide-up-full":
          "modalSlideUpFull 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "modal-slide-down-full":
          "modalSlideDownFull 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};
