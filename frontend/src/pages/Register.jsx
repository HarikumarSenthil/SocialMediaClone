import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!user.username.trim()) newErrors.username = "Username is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    if (!user.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      toast.error("Please fill all fields before registering!");
      return;
    }

    try {
      await registerUser(user);
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration Failed! Try again.");
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
            Register
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                onClick={handleRegister}
                >
                Register
                </Button>

          </Box>

          <Typography textAlign="center" marginTop={2}>
            Already have an account?{" "}
            <Button onClick={() => navigate("/login")} sx={{ textTransform: "none", fontWeight: "bold" }}>
              Login
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
