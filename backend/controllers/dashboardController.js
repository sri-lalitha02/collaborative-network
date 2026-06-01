const User = require("../models/User");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Task = require("../models/Task");

// ================= GET STATS =================
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTeams = await Team.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();

    res.json({
      totalUsers,
      totalTeams,
      totalProjects,
      totalTasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET RECENT PROJECTS =================
exports.getRecentProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("team", "name")
      .populate("createdBy", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ACTIVITY (simple version) =================
exports.getActivity = async (req, res) => {
  try {
    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("assignedTo", "name email");

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "name email");

    res.json({
      recentTasks,
      recentProjects,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};