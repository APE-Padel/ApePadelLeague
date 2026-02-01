import * as usersClient from '../data/usersClient.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ERROR_CODES } from "../constants.js";

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
