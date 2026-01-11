import mongoose from 'mongoose';
import Standings from "../models/standings.js";

export async function getStandings(filters = {}) {
  const result = await Standings.find(filters)
    .populate('season', 'name')
    .populate('table.team', 'name logoBase64 players');

  return result;
}

