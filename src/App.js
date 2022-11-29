import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fontsource/roboto/400.css";

import { ThemeMode, ThemeContext } from "./components/layout/Theme";
import { PageContextProvider } from "./components/Contexts";
import TopBar from "./components/layout/TopBar";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/pages/dashboard/Dashboard";
import FindWorkshop from "./components/pages/FindWorkshop";

function App() {
  const [theme, colorMode] = ThemeMode();
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={colorMode}>
        <PageContextProvider>
          <Router>
            <Nav />
            <Box id="content"
              sx={{
                ml: `calc(${theme.spacing(7)} + 30px)`,
                mr: "30px",
                [theme.breakpoints.up("sm")]: {
                  ml: `calc(${theme.spacing(8)} + 30px)`,
                },
              }}
            >
              <TopBar />
              <Grid container spacing={2}>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={<Dashboard pageName="Dashboard" />}
                  />
                  <Route
                    path="/find"
                    element={<FindWorkshop pageName="Find workshop" />}
                  />
                </Routes>
              </Grid>
            </Box>
          </Router>
        </PageContextProvider>
      </ThemeContext.Provider>
      <CssBaseline />
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
