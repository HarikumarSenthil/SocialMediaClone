import { useState } from "react";
import { createPost } from "../services/api"; // API call to backend
import { Container, Card, CardContent, TextField, Button, Typography, Box, Avatar } from "@mui/material";
import { CameraAlt, Delete } from "@mui/icons-material"; // Icon for image upload
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const PostForm = ({ onPostAdded }) => {
  const [postData, setPostData] = useState({
    content: "",
    image: null,
    preview: null, 
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setPostData({ ...postData, content: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData({
        ...postData,
        image: file,
        preview: URL.createObjectURL(file), 
      });
    }
  };

  const handleRemoveImage = () => {
    setPostData({ ...postData, image: null, preview: null });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!postData.content.trim()) newErrors.content = "Post content is required";
    if (!postData.image) newErrors.image = "Please upload an image";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all fields before posting!");
      return;
    }
    const token = localStorage.getItem("token");
    // if (!token) {
    //   toast.error("User not authenticated");
    //   return;
    // }
    const decoded = jwtDecode(token);
    const userId = decoded.userId; 

    const formData = new FormData();
    formData.append("username", decoded.username);
    formData.append("content", postData.content);
    formData.append("image", postData.image);
    formData.append("userId", userId)

    try {
      console.log("Frontend Post Data: ", postData);
      const newPost = await createPost(formData);
      toast.success("Post created successfully!");
      onPostAdded(newPost);
      setPostData({ content: "", image: null, preview: null }); 
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 5 }}>
      <Card sx={{ width: { xs: "100%", sm: "500px" }, boxShadow: 6, borderRadius: 3, padding: 3, backgroundColor: "#fff" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary.main" gutterBottom>
            Create a New Post
          </Typography>

          <Box display="flex" flexDirection="column" gap={3} component="form" onSubmit={handleSubmit}>
            <TextField
              label="What's on your mind?"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                padding: "10px",
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
              error={!!errors.content}
              helperText={errors.content}
              value={postData.content}
              onChange={handleInputChange}
            />

            {/* Image Upload Box */}
            <Box sx={{ textAlign: "center", position: "relative" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  color="secondary"
                  sx={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 2,
                    border: "2px dashed #dcdcdc",
                    textTransform: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CameraAlt /> {postData.image ? "Change Image" : "Upload Image"}
                </Button>
              </label>

              {postData.preview && (
                <Box sx={{ marginTop: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Avatar
                    src={postData.preview}
                    alt="Preview"
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: "10px",
                      boxShadow: 3,
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    variant="text"
                    color="error"
                    onClick={handleRemoveImage}
                    startIcon={<Delete />}
                    sx={{ marginTop: 1 }}
                  >
                    Remove Image
                  </Button>
                </Box>
              )}

              {errors.image && <Typography color="error">{errors.image}</Typography>}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "12px",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 3,
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                "&:hover": { backgroundColor: "#45a049" },
              }}
            >
              Post
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostForm;
