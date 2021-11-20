import axios from "axios";

// const url = "https://memories-thangzathang.herokuapp.com/posts";

// const API = axios.create({ baseURL: "https://memories-thangzathang.herokuapp.com" });

const API = axios.create({ baseURL: "http://localhost:5000" });

// API Interceptor
// We add the token to our req.headers so that on the back end (middleware/auth), we cam verify token.
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

// API end points
export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// Sign in and Sign Up Routes
export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);
