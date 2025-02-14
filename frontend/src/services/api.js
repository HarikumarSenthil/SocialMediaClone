import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 🔹 Authentication APIs
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// 🔹 Posts APIs
export const fetchPosts = () => API.get("/posts");
export const createPost = (postData) => API.post("/posts", postData);

export const toggleLikePost = (postId, username) => 
  API.post(`/posts/${postId}/like`, { username });

export const getLikeStatus = (postId, username) => 
  API.get(`/posts/${postId}/like-status`, { params: { username } });


export default API;


