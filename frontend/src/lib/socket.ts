import { io, Socket } from "socket.io-client";

const socket: Socket = io(
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : `http://localhost:${process.env.REACT_APP_API_PORT}`,
  {
    transports: ["websocket"],
    withCredentials: true,
  }
);

export default socket;
