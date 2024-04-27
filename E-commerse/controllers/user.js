const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  findUserById: async (req, res, next, id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const user = req.user;
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ msg: "new password and confirm password must match" });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.hashed_password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Incorrect password" });
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.hashed_password = hashedPassword;
      await user.save();
      res.json({ success: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addOrderToHistory: async (req, res) => {
    try {
      const order = req.body;
      const user = req.user;
      user.history.push(order);
      await user.save();
      res.json({ success: "Order added to history" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
