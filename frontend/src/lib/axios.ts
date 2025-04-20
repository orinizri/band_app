import axios from "axios";

const isProd = process.env.NODE_ENV === "production";

export const api = axios.create({
  baseURL: isProd
    ? process.env.REACT_APP_API_URL
    : "http://localhost:" + process.env.REACT_APP_API_PORT,
  withCredentials: true,
});

export const attachToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearToken = () => {
  delete api.defaults.headers.common["Authorization"];
};
