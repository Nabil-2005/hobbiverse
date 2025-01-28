import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xxs: ["10px", "12px"],
      xs: ["11px", "13px"],
      sm: ["13px", "18px"],
      base: ["15px", "20px"],
      md: ["16px", "21px"],
      lg: ["17px", "22px"],
      xl: ["22px", "24px"],
    }, // copy relivet
    extend: {
      colors: {
        music: {
          primary: "#025964",
          accent: "#00d47e",
          bg: "#f4f4f4",
        },
        games: {
          primary: "#1d3557",
          accent: "#457b9d",
          bg: "#f0f8ff",
        },
        animanga: {
          primary: "#6a040f",
          accent: "#d00000",
          bg: "#fef3f3",
        },
        home: {
          primary: "#3a3d98",
          accent: "#ffd166",
          bg: "#f7f7f7",
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          shade: {
            1: "#325580",
            2: "#EAEEF3",
            3: "#F3F8FF",
            0.5: "#577BA7",
          }, // copy relivet
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          shade: {
            1: "#464646",
          }, // copy relivet
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        error: "hsl(var(--error))", // copy relivet
        success: "hsl(var(--success))", // copy relivet
        info: "hsl(var(--info))", // copy relivet
        warning: "hsl(var(--warning))", // copy relivet
        notifyIndicator: "#B5492A", // copy relivet
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        text: {
          DEFAULT: "#1A1A1A",
          primary: {
            1: "#1A1A1A",
            2: "#0A0A0A",
          },
          secondary: "#474747",
          disabled: "#CECECE",
          title: "#383838",
          tertiary: "#848484",
        }, // copy relivet
        hoverBg: "#0000000A",
        semantics: {
          success: "var(--success)",
          info: "var(--info)",
          warning: "var(--warning)",
          error: "var(--error)",
        }, // copy relivet
        neutrals: {
          DEFAULT: "#F5F5F5",
          bg: "#FFFFFF",
          card: "#FFFFFF",
          fields: "#F3F3F5",
          stroke: "#E5E5E5",
        }, // copy relivet
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        DEFAULT: "#E5E5E5",
        primary: "#E5E5E5",
      }, // copy relivet
      fontFamily: {
        inter: "var(--font-inter)",
        roboto: "var(--font-roboto)",
      },
      boxShadow: {
        dashboardMain: "0px 4px 48px 0px rgba(0, 0, 0, 0.04)",
        dropShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.14)",
        sortPopover: "0px 4px 48px 0px rgba(0, 0, 0, 0.24)",
        closeIconButton:
          "0px 0px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 8px 0px rgba(0, 0, 0, 0.08)",
      }, // copy relivet
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
