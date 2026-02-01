import User from '../models/user.js';

export async function getUsers(filters = {}) {
  const result = await User.find(filters);
  return result;
}

export async function createUser(userProps) {
  const user = new User(userProps);
  await user.save();
  return user;
}
