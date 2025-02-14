import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { Typography, CircularProgress, Box } from "@mui/material";
import {jwtDecode} from "jwt-decode"; 

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null); 


  const fetchAllPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await fetchPosts();
      console.log("Fetched Posts:", data);

      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again.");
      setPosts([]);
    }
    setLoading(false);
  };


  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <PostForm fetchPosts={fetchAllPosts} />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Typography color="error">{error}</Typography>}

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            fetchPosts={fetchAllPosts} 
            currentUser={currentUser} 
          />
        ))
      ) : (
        !loading && !error && <Typography sx={{ textAlign: "center", marginTop: 2 }}>No posts available.</Typography>
      )}
    </Box>
  );
};

export default Home;
