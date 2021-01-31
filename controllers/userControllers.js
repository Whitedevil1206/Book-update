import mongoose from 'mongoose';
import User from '../models/user.js';
import Subscriber from '../models/subscriber.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    _id: new mongoose.Types.ObjectId(),
  });

  try {
    const sub = await Subscriber.findOne({ email: newUser.email });
    newUser.subscribed = sub._id;
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('User Id is invalid');

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(203).json(deletedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  //Check if user already exists
  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail)
    return res.status(400).json({ message: 'Email already exists' });

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating a new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    _id: new mongoose.Types.ObjectId(),
  });

  const sub = await Subscriber.findOne({ email: newUser.email });
  if (sub) {
    try {
      newUser.subscribed = sub._id;
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else {
    const newSubscriber = new Subscriber({
      name: newUser.name,
      email: newUser.email,
      _id: new mongoose.Types.ObjectId(),
    });
    newUser.subscribed = newSubscriber._id;
    try {
      await newSubscriber.save();
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};

export const loginUser = async (req, res) => {
  //Check if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email dosen't exist" });

  //Password check
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ message: 'Passwords do not match' });

  //Create and assign a token
  const token = jwt.sign(
    { name: user.name, subscriber: user.subscribed.toString() },
    process.env.TOKEN_SECRET
  );
  res.header('auth-token', token).json({ jwtToken: token });
};
