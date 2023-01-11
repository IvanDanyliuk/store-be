import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';


export const signin = async (email: any, password: any) => {
  try {
    const existingUser = await User.findOne({ email });
    if(!existingUser) {
      throw Error('User does not exist.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
      throw Error('Invalid credentials.');
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
    return ({ result: existingUser, token });
  } catch (error: any) {
    throw Error(error);
  }
};

export const signup = async (userData: any) => {
  const { firstName, lastName, avatarUrl, email, password, confirmPassword, phone, city, orders, isAdmin } = userData;
  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      throw Error('User already exists.');
    }
    if(password !== confirmPassword) {
      throw Error('Passwords don\'t match.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName, avatarUrl, phone, city, orders, isAdmin });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: '1h' });
    return ({ result: newUser, token });
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateUser = async (id: any, userData: any) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return updatedUser;
  } catch (error: any) {
    throw Error('Cannot update a user');
  }
};

export const updatePassword = async (id: any, currentPassword: any, newPassword: any) => {
  try {
    const user = await User.findById(id);
    const isPasswordMatch = await bcrypt.compare(currentPassword, user!.password);

    if(isPasswordMatch) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      //@ts-ignore
      const updated = await User.findByIdAndUpdate(id, { ...user!._doc, password: hashedNewPassword }, { new: true });
      return updated;
    } else {
      throw Error('Passwords don\'t match.');
    }
  } catch (error: any) {
    throw Error(error);
  }
};

export const deleteUser = async (id: any) => {
  try {
    await User.findByIdAndDelete(id);
    return 'User has been deleted successfully';
  } catch (error: any) {
    throw Error('Cannot delete a user');
  }
};