import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createToken } from '../services/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, department, id, contact } = req.body;

    if (!email.endsWith('@rguktong.ac.in')) {
      return res.status(400).json({ message: 'Email must be @rguktong.ac.in' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      department,
      id,
      contact,
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user._id);
    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
