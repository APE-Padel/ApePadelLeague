import Standings from "../models/standings.js";

export async function getStandings(filters = {}) {
  const result = await Standings.find(filters)
    .populate('season', 'name')
    .populate('table.team', 'name logoBase64 players');

  return result;
}

export async function createStandings(standingsProps) {
  const standings = new Standings(standingsProps);
  const result = await standings.save();
  return result;
}

export async function updateStandingsById(standingsId, updateProps) {
  const updatedStandings = await Standings.findByIdAndUpdate(
    standingsId,
    updateProps,
    { new: true }
  );

  return updatedStandings;
}
