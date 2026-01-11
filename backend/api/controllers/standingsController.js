import * as Service from "../services/standingsService.js";

export const getActiveSeasonStandings = async (_, res) => {
    try {
        const standings = await Service.getActiveSeasonStandings();
        res.json(standings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const recalculateStandings = async (req, res) => {
    const { seasonId } = req.params;
    try {
        await Service.recalculateStandings(seasonId);
        res.json({ message: 'Standings recalculated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
