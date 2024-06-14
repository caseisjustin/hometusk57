import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import User from '../models/User.js';
const { JWT_SECRET } = process.env;

export const signup = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ id: newUser[0].id, username: newUser[0].username, role: newUser[0].role });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = otpGenerator.generate(32, { alphabets: true, upperCase: true, specialChars: false });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    // Logic to verify refresh token and generate new access token
    const newAccessToken = jwt.sign({ id: req.user.id, role: req.user.role }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
