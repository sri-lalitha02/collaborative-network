const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./app");

// ================= DB CONNECTION =================
const connectDB = require("./config/db");
connectDB();

// ================= SWAGGER =================
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Creator Backend API",
      version: "1.0.0",
      description: "API Documentation"
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// ================= SWAGGER ROUTE =================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ================= HTTP SERVER =================
const server = http.createServer(app);

// ================= SOCKET.IO =================
const { initializeSocket } = require("./sockets/socket");

const io = initializeSocket(server);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📄 Swagger Docs: http://localhost:${PORT}/api-docs`);
});