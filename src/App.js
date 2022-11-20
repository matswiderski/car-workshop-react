import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/400.css";

import { ThemeMode, ThemeContext } from "./components/layout/Theme";
import { PageContextProvider } from "./components/Contexts";
import Footer from "./components/layout/Footer";
import TopBar from "./components/layout/TopBar";

import Nav from "./components/layout/Nav";
import Box from "@mui/material/Box";

function App() {
  const [theme, colorMode] = ThemeMode();
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={colorMode}>
        <PageContextProvider>
          <Nav />
          <Box
            sx={{
              ml: `calc(${theme.spacing(7)} + 30px)`,
              mr: "30px",
              [theme.breakpoints.up("sm")]: {
                ml: `calc(${theme.spacing(8)} + 30px)`,
              },
              // bgcolor: "white"
            }}
          >
            <TopBar />
          </Box>
        </PageContextProvider>
      </ThemeContext.Provider>
      <CssBaseline />
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
