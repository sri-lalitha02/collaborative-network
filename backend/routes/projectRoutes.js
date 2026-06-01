const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByTeam,
} = require("../controllers/projectController");

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management APIs
 */

// ================= CREATE PROJECT =================
/**
 * @swagger
 * /api/project/create:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 */
router.post("/create", protect, createProject);

// ================= GET ALL PROJECTS =================
/**
 * @swagger
 * /api/project/all:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 */
router.get("/all", protect, getProjects);

// ================= GET PROJECTS BY TEAM =================
/**
 * @swagger
 * /api/project/team/{teamId}:
 *   get:
 *     summary: Get projects by team
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 */
router.get("/team/:teamId", protect, getProjectsByTeam);

// ================= GET PROJECT BY ID =================
/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", protect, getProjectById);

// ================= UPDATE PROJECT =================
/**
 * @swagger
 * /api/project/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, updateProject);

// ================= DELETE PROJECT =================
/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, deleteProject);



module.exports = router;