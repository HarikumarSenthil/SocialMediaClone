import React, { useState, useEffect } from "react";
import { toggleLikePost } from "../services/api";
import {jwtDecode} from "jwt-decode"; // For decoding JWT token

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Decode JWT token to get username
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  const handleLike = async () => {
    try {
      if (!username) {
        alert("You must be logged in to like a post!");
        return;
      }
      console.log("frontend!!!!..." + post.id + " " + username);
      const response = await toggleLikePost(post.id, username);
      
      if (response.data.liked) {
        setLikes((prevLikes) => prevLikes + 1);
      } else {
        setLikes((prevLikes) => prevLikes - 1);
      }

      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold">{post.username}</h2>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="mt-2 rounded" style={{ width: "150px", height: "auto" }} />}

      <div className="flex justify-between items-center mt-3">
        <button 
          onClick={handleLike} 
          className={`px-4 py-2 rounded-md transition ${liked ? "bg-red-500" : "bg-blue-500"} text-white`}>
          {liked ? "❤️ Unlike" : "👍 Like"} ({likes})
        </button>
      </div>
    </div>
  );
};

export default PostCard;
