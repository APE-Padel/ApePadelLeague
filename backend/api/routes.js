import { Router } from "express";
import { createSeason, getAllSeasons } from "../controllers/seasonsController.js";
import { getAllTeams, getActiveSeasonTeams, createTeam } from "../controllers/teamsController.js";
import { createMatch, getActiveSeasonMatches, updateMatchResult } from "../controllers/matchesController.js";
import { getActiveSeasonStandings, recalculateStandings } from "../controllers/standingsController.js";
import { registerUser, login } from "../controllers/authController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { AUTH_CONDITIONS } from "../constants.js";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     description: Check if API is working
 *     responses:
 *       200:
 *         description: API is working
 */
router.get("/", (_, res) => (res.send("API is working")));

/**
 * @swagger
 * /seasons:
 *   get:
 *     summary: Get all seasons
 *     tags: [Seasons]
 *     responses:
 *       200:
 *         description: List of all seasons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Season'
 */
router.get("/seasons", getAllSeasons);

/**
 * @swagger
 * /seasons:
 *   post:
 *     summary: Create a new season
 *     tags: [Seasons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Season created successfully
 */
router.post("/seasons", authenticate, authorize, createSeason);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of all teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get("/teams", getAllTeams);

/**
 * @swagger
 * /seasons/active/teams:
 *   get:
 *     summary: Get teams for active season
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of teams for active season
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get("/seasons/active/teams", getActiveSeasonTeams);

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created successfully
 */
router.post("/teams", authenticate, authorize, createTeam);

/**
 * @swagger
 * /seasons/active/matches:
 *   get:
 *     summary: Get matches for active season
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: List of matches for active season
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get("/seasons/active/matches", getActiveSeasonMatches);

/**
 * @swagger
 * /matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seasonId:
 *                 type: string
 *               team1Id:
 *                 type: string
 *               team2Id:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Match created successfully
 */
router.post("/matches", authenticate, authorize, createMatch);

/**
 * @swagger
 * /matches/{matchId}/result:
 *   put:
 *     summary: Update the result of a match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []  # Indicates JWT Bearer authentication is required
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the match to update the result for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               homeScore:
 *                 type: integer
 *               awayScore:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Match result updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Match result updated successfully
 *       401:
 *         description: Unauthorized – JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided
 *       403:
 *         description: Forbidden – User does not have permission (not admin or submitter)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.put("/matches/:matchId/result", authenticate, authorize([AUTH_CONDITIONS.SUBMITTER]), updateMatchResult);


/**
 * @swagger
 * /seasons/active/standings:
 *   get:
 *     summary: Get standings for active season
 *     tags: [Standings]
 *     responses:
 *       200:
 *         description: Standings for active season
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Standings'
 */
router.get("/seasons/active/standings", getActiveSeasonStandings);

/**
 * @swagger
 * /seasons/{seasonId}/standings/recalculate:
 *   post:
 *     summary: Recalculate standings for a season
 *     tags:
 *       - Standings
 *     parameters:
 *       - in: path
 *         name: seasonId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the season to recalculate standings for
 *     responses:
 *       200:
 *         description: Standings recalculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Standings recalculated successfully
 */
router.post("/seasons/:seasonId/standings/recalculate", recalculateStandings);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid username or password
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Server error
 */
router.post("/auth/login", login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Username already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Username already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Server error
 */
router.post("/auth/register", registerUser);

export default router;