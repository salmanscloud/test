const router = require("express").Router();
const { isAuth, isAdmin } = require("../controllers/auth");
const {
  createProduct,
  findProductById,
  readProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/product");
const { findUserById } = require("../controllers/user");
const { upload } = require("../middlewares/photoMiddleware");

router.post(
  "/product/create/:userId",
  isAuth,
  isAdmin,
  upload.single("photo"),
  createProduct
);
router.get("/products", getAllProducts);
router.get("/product/:productId", findProductById, readProduct);

// still need to complete in front-end
router.put(
  "/product/update/:productId/:userId",
  isAuth,
  isAdmin,
  upload.single("photo"),
  updateProduct
);
router.delete("/product/:productId/:userId", isAuth, isAdmin, deleteProduct);

router.param("userId", findUserById);
router.param("productId", findProductById);

module.exports = router;
