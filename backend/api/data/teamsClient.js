import Team from '../models/team.js';

export async function getAllTeams() {
  const result = await Team.find();
  return result;
}

export async function createTeam(teamProps) {
  const team = new Team(teamProps);
  const result = await team.save();
  return result;
}