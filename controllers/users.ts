import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';


export const signin = async (req: any, res: any) => {
  const { email, password } = req.body.params.userData;
  try {
    const existingUser = await User.findOne({ email });
    if(!existingUser) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
    res.status(200).json({ result: existingUser, token });
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const signup = async (req: any, res: any) => {
  const { firstName, lastName, avatarUrl, email, password, confirmPassword, phone, city, orders, isAdmin } = req.body.params.userData;
  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    if(password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords don\'t match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName, avatarUrl, phone, city, orders, isAdmin });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: '1h' });
    res.status(200).json({ result: newUser, token });
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const { id, userData } = req.body.params.userData;
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    await User.findByIdAndDelete(id);
    res.status(200).json('User has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};