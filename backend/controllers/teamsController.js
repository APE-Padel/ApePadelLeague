import * as Client from "../data/teamsClient.js";

export const createTeam = async (req, res) => {
  try {
    const teamProps = req.body;
    const team = await Client.createTeam(teamProps);
    res.status(201).json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllTeams = async (_, res) => {
  try {
    const teams = await Client.getTeams();
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
