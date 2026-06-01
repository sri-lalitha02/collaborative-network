const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Join user-specific room
    socket.on("joinUserRoom", (userId) => {
      if (!userId || typeof userId !== "string") return;
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  return io;
};

// Get io instance anywhere in project
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initializeSocket(server) first.");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};