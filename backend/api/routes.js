import { Router } from "express";
import { getAllTeams, createTeam } from "./controllers/teamsController.js";

const router = Router();

router.get("/", (_, res) => (res.send("API is working")));

router.get("/teams", getAllTeams);
router.post("/teams", createTeam);

export default router;