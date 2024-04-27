const router = require("express").Router();

const { isAuth, isAdmin } = require("../controllers/auth");
const {
  createCategory,
  findCategoryById,
  readCategory,
  updateCategory,
  deleteCategory,
  listCategories,
} = require("../controllers/category");
const { findUserById } = require("../controllers/user");

router.post("/category/create/:userId", isAuth, isAdmin, createCategory);
router.get("/categories", listCategories);

// still need to complete in front-end
router.get("/category/:categoryId", readCategory);
router.put(
  "/category/update/:categoryId/:userId",
  isAuth,
  isAdmin,
  updateCategory
);
router.delete(
  "/category/delete/:categoryId/:userId",
  isAuth,
  isAdmin,
  deleteCategory
);

router.param("userId", findUserById);
router.param("categoryId", findCategoryById);

module.exports = router;
