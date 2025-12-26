import { Router } from "express";
import { createSeason } from "./controllers/seasonsController.js";
import { getAllTeams, createTeam } from "./controllers/teamsController.js";
import { createMatch, getActiveSeasonMatches } from "./controllers/matchesController.js";

const router = Router();

router.get("/", (_, res) => (res.send("API is working")));

// Seasons routes
router.post("/seasons", createSeason);

// Teams routes
router.get("/teams", getAllTeams);
router.post("/teams", createTeam);

// Matches routes
router.get("/seasons/active/matches", getActiveSeasonMatches);
router.post("/matches", createMatch);

export default router;