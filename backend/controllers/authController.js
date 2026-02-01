import * as Service from "../services/authService.js";
import { ERROR_CODES } from "../constants.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await Service.login(username, password);
    res.json({ token });
  } catch (err) {

    if (err.code === ERROR_CODES.INVALID_CREDENTIALS) {
      return res.status(401).json({ message: err.message });
    }
    
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Service.registerUser(username, password);
    res.status(201).json(user);
  } catch (err) {

    if (err.code === ERROR_CODES.USERNAME_EXISTS) {
      return res.status(409).json({ message: err.message });
    }

    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
