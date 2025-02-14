import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await loginUser(credentials);
      localStorage.setItem("token", data.token);
      console.log("Token!!!!!....", data.token);
      setAuth(true); 
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: { xs: "90%", sm: "400px" }, boxShadow: 5, padding: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
            Login
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField 
              label="Email" 
              variant="outlined" 
              fullWidth 
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
            />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
            />
            <Button 
              variant="contained" 
              fullWidth 
              sx={{
                background: "linear-gradient(90deg, #1e90ff, #3742fa)",
                boxShadow: "0px 4px 10px rgba(30, 144, 255, 0.6)",
                color: "white",
                "&:hover": { background: "linear-gradient(90deg, #3742fa, #1e90ff)" },
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>

          <Typography textAlign="center" marginTop={2}>
            Don't have an account?{" "}
            <Button 
              onClick={() => navigate("/register")} 
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Register
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
