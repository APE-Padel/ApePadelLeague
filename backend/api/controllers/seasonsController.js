import * as Client from "../data/seasonsClient.js";

export const createSeason = async (req, res) => {
  try {
    const seasonProps = req.body;
    const season = await Client.createSeason(seasonProps);
    res.status(201).json(season);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
