import { IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./Theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeButton() {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  return (
    <>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </>
  );
}
