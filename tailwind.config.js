/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          glass: (value, { modifier }) => {
            const offset = modifier || value
            const height = `calc(100% - ${offset})`

            return {
              "&::before": {
                content: "var(--tw-content)",
                position: "absolute",
                inset: "0",
                bottom: `-${offset}`,
                maskImage: `linear-gradient(to bottom, black 0, black ${height}, transparent ${height})`,
                "--tw-backdrop-blur": `blur(${value})`,
                backdropFilter:
                  "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)",
              },
            }
          },
        },
        {
          values: theme("blur"),
          modifiers: theme("spacing"),
        }
      )

      matchUtilities(
        {
          "glass-edge": (value, { modifier }) => {
            const offset = modifier || value
            const top = `calc(100% - ${offset} - 1px)`
            const bottom = `calc(100% - ${offset})`

            return {
              "&::before": {
                content: "var(--tw-content)",
                position: "absolute",
                inset: "0",
                bottom: `-${offset}`,
                maskImage: `linear-gradient(to bottom, transparent 0, transparent ${top}, black ${top}, black ${bottom}, transparent ${bottom})`,
                "--tw-backdrop-blur": `blur(${value})`,
                "--tw-backdrop-brightness": `brightness(1.5)`,
                "--tw-backdrop-saturate": `saturate(1.5)`,
                backdropFilter:
                  "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)",
              },
            }
          },
        },
        {
          values: theme("blur"),
          modifiers: theme("spacing"),
        }
      )
    }),
  ],
}
