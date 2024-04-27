const router = require("express").Router();
const {
  findUserById,
  updateUserPassword,
  addOrderToHistory,
} = require("../controllers/user");
const {
  register,
  login,
  logout,
  isAuth,
  deleteUser,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/user/updatePassword/:userId", isAuth, updateUserPassword);
router.post("/user/addOrderToHistory/:userId", isAuth, addOrderToHistory);

// Still need to complete in front-end
router.delete("/user/delete/:userId", isAuth, deleteUser);

router.param("userId", findUserById);

module.exports = router;
