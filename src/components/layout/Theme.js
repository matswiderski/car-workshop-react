import { useMemo, useState, createContext } from "react";
import { createTheme } from "@mui/material/styles";

const colors = (mode) => {
  if (mode === "dark") {
    return {
      primary: {
        main: "#5998C5",
        light: "#3E6A8A",
        dark: "#8BB7D6",
      },
      secondary: {
        main: "#FFF689",
        light: "#B3AC60",
        dark: "#FFF9AC",
      },
    };
  } else {
    return {
      primary: {
        main: "#5998C5",
        light: "#8BB7D6",
        dark: "#3E6A8A",
      },
      secondary: {
        main: "#FFF689",
        light: "#FFF9AC",
        dark: "#B3AC60",
      },
    };
  }
};

const themeSettings = (mode) => {
  const themeColors = colors(mode);
  return {
    palette: {
      mode: mode,
      primary: themeColors.primary,
      secondary: themeColors.secondary,
    },
  };
};

export const ThemeContext = createContext({
  toggleColorMode: () => {},
  theme: {},
});

export function ThemeMode() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  return [theme, colorMode];
}
