import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { USER_ROLES, AUTH_CONDITIONS } from '../constants.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export function authorize(conditions) {
    return (req, res, next) => {
        const user = req.user;

        if (user.role === USER_ROLES.ADMIN) {
            return next();
        }

        if (conditions.includes(AUTH_CONDITIONS.SUBMITTER) && user.role === USER_ROLES.SUBMITTER) {
            return next();
        }

        return res.status(403).json({ message: 'Forbidden' });
    }
}