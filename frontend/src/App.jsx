import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/lato/700.css";

const theme = createTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
  },
});

const App = () => {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setAuth(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
        <Container sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </Container>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
