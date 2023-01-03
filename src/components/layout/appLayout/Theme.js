import { useMemo, useState, createContext, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from '@mui/material/colors';

const colors = (mode) => {
  if (mode === "dark") {
    return {
      primary: {
        main: "#ff6384",
        light: "#ff92a9",
        dark: "#b3455c",
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
        main: "#ff6384",
        light: "#b3455c",
        dark: "#ff92a9",
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
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "#bdbdbd",
              height: 10,
              width: 10,
              borderRadius: 5,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 5,
              backgroundColor: "#757575",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#616161",
            },
          },
        },
      },
    },
  };
};



export const ThemeContext = createContext({
  toggleColorMode: () => {},
  theme: {},
});

export const ThemeMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);
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
};
