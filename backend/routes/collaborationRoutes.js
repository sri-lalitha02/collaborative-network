const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendRequest,
  getRequests,
  getPendingRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/collaborationController");

/**
 * ================= TAG =================
 * @swagger
 * tags:
 *   name: Collaboration
 *   description: Collaboration request APIs
 */

/**
 * ================= SEND REQUEST =================
 * @swagger
 * /api/collaboration/send:
 *   post:
 *     summary: Send collaboration request
 *     tags: [Collaboration]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CollaborationRequest'
 *     responses:
 *       201:
 *         description: Request sent successfully
 */
router.post("/send", protect, sendRequest);

/**
 * ================= GET ALL REQUESTS =================
 * @swagger
 * /api/collaboration/all:
 *   get:
 *     summary: Get all collaboration requests
 *     tags: [Collaboration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All requests fetched
 */
router.get("/all", protect, getRequests);

/**
 * ================= GET PENDING =================
 * @swagger
 * /api/collaboration/pending:
 *   get:
 *     summary: Get pending requests
 *     tags: [Collaboration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending requests fetched
 */
router.get("/pending", protect, getPendingRequests);

/**
 * ================= ACCEPT =================
 * @swagger
 * /api/collaboration/accept/{id}:
 *   put:
 *     summary: Accept collaboration request
 *     tags: [Collaboration]
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
 *         description: Request accepted
 */
router.put("/accept/:id", protect, acceptRequest);

/**
 * ================= REJECT =================
 * @swagger
 * /api/collaboration/reject/{id}:
 *   put:
 *     summary: Reject collaboration request
 *     tags: [Collaboration]
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
 *         description: Request rejected
 */
router.put("/reject/:id", protect, rejectRequest);

module.exports = router;