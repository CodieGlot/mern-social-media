import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./common";
import { useAppSelector } from "./hooks";
import { AuthPage } from "./pages/Auth";
import { HomePage } from "./pages/Home";
import { ProfilePage } from "./pages/Profile";

function App() {
  const themeMode = useAppSelector((state) => state.themeMode);
  const theme = useMemo(
    () => createTheme(themeSettings(themeMode)),
    [themeMode]
  );
  // const isAuth = Boolean(useAppSelector((state) => state.authTokenPayload));

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
