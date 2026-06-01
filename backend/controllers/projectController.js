const Project = require("../models/Project");
const asyncHandler = require("../middleware/asyncHandler");

// ================= CREATE PROJECT =================
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    team: req.body.team,
    createdBy: req.user._id,
  });

  res.status(201).json(project);
});

// ================= GET ALL PROJECTS =================
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate("createdBy", "name email")
    .populate("team", "name");

  res.json(projects);
});

// ================= GET PROJECT BY ID =================
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("createdBy", "name email")
    .populate("team", "name");

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});

// ================= UPDATE PROJECT =================
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  project.status = req.body.status || project.status;

  const updated = await project.save();

  res.json(updated);
});

// ================= DELETE PROJECT =================
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  await project.deleteOne();

  res.json({ message: "Project deleted successfully" });
});

// ================= GET PROJECTS BY TEAM =================
const getProjectsByTeam = asyncHandler(async (req, res) => {
  const projects = await Project.find({ team: req.params.teamId })
    .populate("createdBy", "name email")
    .populate("team", "name");

  res.json(projects);
});

// ================= EXPORT =================
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByTeam,
};