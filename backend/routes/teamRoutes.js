const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  joinTeam,
  leaveTeam,
  addMember,
  removeMember,
} = require("../controllers/teamController");

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Team management APIs
 */

// ================= CREATE TEAM =================
/**
 * @swagger
 * /api/team/create:
 *   post:
 *     summary: Create a new team
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamCreateRequest'
 *     responses:
 *       201:
 *         description: Team created successfully
 */
router.post("/create", protect, createTeam);

// ================= GET ALL TEAMS =================
/**
 * @swagger
 * /api/team/all:
 *   get:
 *     summary: Get all teams
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teams
 */
router.get("/all", protect, getTeams);

// ================= GET TEAM BY ID =================
/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Get team by ID
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team found
 *       404:
 *         description: Team not found
 */
router.get("/:id", protect, getTeamById);

// ================= UPDATE TEAM =================
/**
 * @swagger
 * /api/team/{id}:
 *   put:
 *     summary: Update team
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamCreateRequest'
 *     responses:
 *       200:
 *         description: Team updated
 */
router.put("/:id", protect, updateTeam);

// ================= DELETE TEAM =================
/**
 * @swagger
 * /api/team/{id}:
 *   delete:
 *     summary: Delete team
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team deleted
 */
router.delete("/:id", protect, deleteTeam);

// ================= JOIN TEAM =================
/**
 * @swagger
 * /api/team/join/{id}:
 *   post:
 *     summary: Join a team
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Joined team successfully
 */
router.post("/join/:id", protect, joinTeam);

// ================= LEAVE TEAM =================
/**
 * @swagger
 * /api/team/leave/{id}:
 *   post:
 *     summary: Leave a team
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Left team successfully
 */
router.post("/leave/:id", protect, leaveTeam);

// ================= ADD MEMBER =================
/**
 * @swagger
 * /api/team/add-member/{id}:
 *   post:
 *     summary: Add member to team
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMemberRequest'
 *     responses:
 *       200:
 *         description: Member added
 */
router.post("/add-member/:id", protect, addMember);

// ================= REMOVE MEMBER =================
/**
 * @swagger
 * /api/team/remove-member/{id}:
 *   post:
 *     summary: Remove member from team
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMemberRequest'
 *     responses:
 *       200:
 *         description: Member removed
 */
router.post("/remove-member/:id", protect, removeMember);

module.exports = router;