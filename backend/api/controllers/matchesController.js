import * as Client from "../data/matchesClient.js";
import * as Service from "../services/matchesService.js";

export const getActiveSeasonMatches = async (_, res) => {
    try {
        const matches = await Service.getActiveSeasonMatches();
        res.json(matches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createMatch = async (req, res) => {
  try {
    const matchProps = req.body;
    const match = await Client.createMatch(matchProps);
    res.status(201).json(match);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
