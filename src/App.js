import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/400.css";
import { ThemeMode, ThemeContext } from "./components/layout/appLayout/Theme";
import { PageContextProvider } from "./context/PageContext";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Repairs from "./components/pages/repairs/Repairs";
import AppLayout from "./components/layout/appLayout/AppLayout";
import AuthLayout from "./components/layout/authLayout/AuthLayout";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import NoMatch from "./components/layout/NoMatch";
import RequireAuth from "./components/pages/auth/RequireAuth";
import Settings from "./components/pages/settings/Settings";
import Notification from "./components/layout/Notification";
import { NotificationContextProvider } from "./context/NotificationContext";
import Cars from "./components/pages/Cars";
import RequireNotAuth from "./components/pages/auth/RequireNotAuth";
function App() {
  const [theme, colorMode] = ThemeMode();
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={colorMode}>
        <PageContextProvider>
          <NotificationContextProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route element={<AppLayout />}>
                    <Route
                      path="dashboard"
                      element={<Dashboard pageName="Dashboard" />}
                    />
                    <Route
                      path="/repair-center"
                      element={<Repairs pageName="Repair center" />}
                    />
                    <Route
                      path="/cars"
                      element={<Cars pageName="Your cars" />}
                    />
                    <Route
                      path="/settings"
                      element={<Settings pageName="Settings" />}
                    />
                  </Route>
                </Route>
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Register />} />
                </Route>
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </BrowserRouter>
            <Notification />
          </NotificationContextProvider>
        </PageContextProvider>
      </ThemeContext.Provider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
