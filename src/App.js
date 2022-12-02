import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/400.css";

import { ThemeMode, ThemeContext } from "./components/layout/appLayout/Theme";
import { PageContextProvider } from "./context/PageContext";
import { AuthContextProvider } from "./context/AuthContext";

import Dashboard from "./components/pages/dashboard/Dashboard";
import FindWorkshop from "./components/pages/FindWorkshop";
import AppLayout from "./components/layout/appLayout/AppLayout";
import AuthLayout from "./components/layout/authLayout/AuthLayout";
import Login from "./components/pages/login/Login";
import Signin from "./components/pages/login/Signin";
import NoMatch from "./components/layout/NoMatch";
import RequireAuth from "./components/RequireAuth";
import UserDetails from "./components/pages/UserDetails/UserDetails";

function App() {
  const [theme, colorMode] = ThemeMode();
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={colorMode}>
        <AuthContextProvider>
          <PageContextProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route element={<AppLayout />}>
                    <Route
                      path="dashboard"
                      element={<Dashboard pageName="Dashboard" />}
                    />
                    <Route
                      path="/find"
                      element={<FindWorkshop pageName="Find workshop" />}
                    />
                    <Route
                      path="/user"
                      element={<UserDetails pageName="User details" />}
                    />
                  </Route>
                </Route>
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<Login />} />
                  <Route path="/signin" element={<Signin />} />
                </Route>
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </BrowserRouter>
          </PageContextProvider>
        </AuthContextProvider>
      </ThemeContext.Provider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
