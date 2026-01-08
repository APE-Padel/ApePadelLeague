import { Router } from "express";
import { createSeason } from "./controllers/seasonsController.js";
import { getAllTeams, createTeam } from "./controllers/teamsController.js";
import { createMatch, getActiveSeasonMatches } from "./controllers/matchesController.js";

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
router.post("/seasons", createSeason);

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
router.post("/teams", createTeam);

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
router.post("/matches", createMatch);

export default router;