import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://jamoveo-backend-6fk6.onrender.com",
  withCredentials: true,
});
