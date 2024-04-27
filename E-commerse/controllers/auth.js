const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      // Deconstructing values from req.body
      const { firstName, lastName, email, password, passwordCheck } = req.body;
      // Going through multiple checks before creating a new user
      if (!firstName || !lastName || !email || !password || !passwordCheck) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      if (password.length < 8 || !/\d/.test(password)) {
        return res.status(400).json({
          msg: "Password must contain a number and be between 8-12 characters",
        });
      }

      if (password !== passwordCheck) {
        return res.status(400).json({ msg: "Passwords must match" });
      }
      // Making sure user does not exist within database
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ msg: "Email is already registered" });
      }
      // encrypting password data
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      // creating new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        hashed_password: passwordHash,
        salt,
      });

      const savedUser = await newUser.save();

      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      // Deconstructing values from req.body
      const { email, password } = req.body;
      // Going through multiple checks before creating a new user
      if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      // Getting user from database
      const existingUser = await User.findOne({ email: email });

      if (!existingUser) {
        return res.status(400).json({ msg: "Email is not registered" });
      }
      // Checking if password is correct
      const isMatch = await bcrypt.compare(
        password,
        existingUser.hashed_password
      );

      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      }
      // Creating and assigning a token
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // Returning token
      res.json({
        token,
        user: {
          id: existingUser._id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          role: existingUser.role,
          createdAt: existingUser.createdAt,
          history: existingUser.history,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.json({ msg: "Logged out" });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const removedUser = await User.findByIdAndDelete(req.user);
      console.log(removedUser);
      res.json(removedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: err.message });
    }
  },

  isAuth: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }
      const auth = jwt.verify(token, process.env.JWT_SECRET);
      if (!auth) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
      let user = req.user && auth && req.user._id == auth.id;
      if (!user) {
        return res.status(403).json({ msg: "Access denied" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (user.role === 0) {
        return res.status(401).json({ msg: "You are not authorized" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },
};
