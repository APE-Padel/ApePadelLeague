import Team from '../models/team.js';

export async function getTeams(filters = {}) {
  const result = await Team.find(filters);
  return result;
}

export async function createTeam(teamProps) {
  const team = new Team(teamProps);
  const result = await team.save();
  return result;
}