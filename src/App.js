import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/400.css";

import { ThemeMode, ThemeContext } from "./components/layout/Theme";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";

function App() {
  const [theme, colorMode] = ThemeMode();
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={colorMode}>
        <Nav />
      </ThemeContext.Provider>
      <CssBaseline />
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
