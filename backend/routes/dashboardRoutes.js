const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getStats,
  getActivity,
  getRecentProjects,
} = require("../controllers/dashboardController");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard APIs
 */

// ================= STATS =================
/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stats fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardResponse'
 */
router.get("/stats", protect, getStats);

// ================= RECENT PROJECTS =================
/**
 * @swagger
 * /api/dashboard/recent-projects:
 *   get:
 *     summary: Get recent projects
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent projects list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectResponse'
 */
router.get("/recent-projects", protect, getRecentProjects);

// ================= ACTIVITY =================
/**
 * @swagger
 * /api/dashboard/activity:
 *   get:
 *     summary: Get recent activity (projects + tasks)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recentTasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TaskResponse'
 *                 recentProjects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProjectResponse'
 */
router.get("/activity", protect, getActivity);

module.exports = router;