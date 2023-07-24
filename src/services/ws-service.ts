import { io } from "socket.io-client";

/**
 * Socket.io
 */
const URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8899"
    : "http://localhost:8899";

export const socket = io(URL, {
  autoConnect: false,
});
