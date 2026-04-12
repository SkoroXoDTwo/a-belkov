export const tokens = {
  colors: {
    pageBg: "#f4f6f8",
    sidebarBg: "#26293b",
    sidebarActiveBg: "#ffffff",
    sidebarActiveText: "#1c2134",
    sidebarText: "#c8ceda",
    surface: "#ffffff",
    border: "#e4e7ec",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    accent: "#0ea5e9"
  },
  typography: {
    fontFamily:
      "\"Manrope\", \"SF Pro Text\", \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif",
    sizes: {
      xxs: "0.75rem",
      xs: "0.8125rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem"
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.45,
      relaxed: 1.6
    }
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem"
  },
  radii: {
    sm: "0.5rem",
    md: "0.875rem",
    lg: "1.25rem"
  },
  shadows: {
    soft: "0 8px 24px rgba(15, 23, 42, 0.08)"
  },
  breakpoints: {
    mobile: "640px",
    tablet: "960px",
    desktop: "1280px"
  }
} as const;
