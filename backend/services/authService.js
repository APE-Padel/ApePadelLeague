import * as usersClient from '../data/usersClient.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ERROR_CODES } from "../constants.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function login(username, password) {
  username = username.toLowerCase();
  const users = await usersClient.getUsers({ username });
  const user = users[0];

  if (!user) {
    handleInvalidCredentials();
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    handleInvalidCredentials();
  }

  const payload = {
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "48h" });
  return token;
};

export async function registerUser(username, password) {
    username = username.toLowerCase();
    const existingUser = await usersClient.getUsers({ username });
    
    if (existingUser.length > 0) {
        const error = new Error('Username already exists');
        error.code = ERROR_CODES.USERNAME_EXISTS;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userProps = {
        username,
        password: hashedPassword
    };

    const user = await usersClient.createUser(userProps);
    return user;
}

function handleInvalidCredentials() {
    const error = new Error('Invalid credentials');
    error.code = ERROR_CODES.INVALID_CREDENTIALS;
    throw error;
}