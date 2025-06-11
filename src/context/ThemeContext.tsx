import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";

import { type PropsWithChildren, createContext, useContext, useState } from "react";

import { Theme } from "../types/Shared";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const CustomThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT;
  });

  const myTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: "#ff5722", // Orange
      },

      background: {
        default: theme === Theme.DARK ? "#1c1c1c" : "#f7f7f7", // Dark gray/white background
        paper: theme === Theme.DARK ? "#212121" : "#fff", // Slightly lighter gray for cards or surfaces / white
      },
      text: {
        primary: theme === Theme.DARK ? "#ffffff" : "#000", // White text
        secondary: theme === Theme.DARK ? "#b0b0b0" : "#696969", // Light gray text/ dark gray
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Arial', sans-serif",
      h6: {
        fontWeight: 600,
      },
    },
    spacing: 8,
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            "--Paper-overlay": "unset",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            "--Paper-overlay": "unset",
            backgroundImage: "none",
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    const newThme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    if (theme === Theme.LIGHT) setTheme(Theme.DARK);
    else setTheme(Theme.LIGHT);
    localStorage.setItem("theme", newThme);
  };

  const themeValues = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={themeValues}>
      <ThemeProvider theme={myTheme}>
        {children}
        <GlobalStyles
          styles={(theme) => ({
            "*::-webkit-scrollbar": {
              width: 8,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 8,
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main,
              borderRadius: 8,
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.primary.main,
            },
            "*": {
              scrollbarWidth: "thin",
              scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
            },
          })}
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}

export { CustomThemeProvider, useTheme };
