import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      typography: ({}) => ({
        default: {
          css: {
            colors: {
              background: "var(--background)",
              foreground: "var(--foreground)",
            },
            backgroundImage: {},
          },
        },
      }),
    },
  },
  plugins: [],
}
export default config
