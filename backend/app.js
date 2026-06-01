const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/collaboration", require("./routes/collaborationRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

module.exports = app;