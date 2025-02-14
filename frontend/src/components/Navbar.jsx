import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = ({ isAuthenticated, setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false); // ✅ Update state immediately
    navigate("/login");
  };

  useEffect(() => {
    const checkAuth = () => setAuth(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth); // ✅ Sync across tabs
    return () => window.removeEventListener("storage", checkAuth);
  }, [setAuth]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        boxShadow: "0px 8px 15px rgba(255, 255, 255, 0.2)",
        borderBottom: "3px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ cursor: "pointer", color: "#fff", textShadow: "0px 2px 8px rgba(255, 255, 255, 0.8)" }}
          onClick={() => navigate("/")}
        >
          Social Feed
        </Typography>

        <Box>
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              sx={{
                background: "linear-gradient(90deg, #ff6b6b, #ff4757)",
                boxShadow: "0px 4px 10px rgba(255, 71, 87, 0.6)",
                color: "white",
                "&:hover": { background: "linear-gradient(90deg, #ff4757, #ff6b6b)" },
                padding: "6px 16px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              sx={{
                background: "linear-gradient(90deg, #1e90ff, #3742fa)",
                boxShadow: "0px 4px 10px rgba(30, 144, 255, 0.6)",
                color: "white",
                "&:hover": { background: "linear-gradient(90deg, #3742fa, #1e90ff)" },
                padding: "6px 16px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
