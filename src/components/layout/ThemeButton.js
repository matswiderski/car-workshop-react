import { IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./Theme";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";

function ThemeButton() {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <Brightness7RoundedIcon />
      ) : (
        <Brightness4RoundedIcon />
      )}
    </IconButton>
  );
}

export default ThemeButton;
