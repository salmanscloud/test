const Product = require("../models/product");
const fs = require("fs");
const promisify = require("util").promisify;
const unlinkAsync = promisify(fs.unlink);

module.exports = {
  findProductById: async (req, res, next, id) => {
    try {
      const product = await Product.findById(id).populate("category");
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      req.product = product;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      const photo = req.file.filename;

      const { name, description, price, category, quantity } = req.body;
      if (!name || !description || !price || !category || !photo || !quantity) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        photo: {
          fileName: req.file.originalname,
          filePath: req.file.path,
          fileType: req.file.mimetype,
          fileSize: req.file.size,
        },
        quantity,
        shipping: true,
      });
      const savedProduct = await newProduct.save();
      res.json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  readProduct: async (req, res) => {
    try {
      const product = req.product;
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = req.product;
      if (req.file) {
        photo = req.file;
      } else {
        photo = product.photo;
      }
      const { name, description, price, category, quantity } = req.body;
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !photo.filename ||
        !quantity
      ) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      await unlinkAsync(req.product.photo.filePath);

      product.name = name;
      product.description = description;
      product.price = price;
      product.category = category;
      product.photo.fileName = photo.originalname;
      product.photo.filePath = photo.path;
      product.photo.fileType = photo.mimetype;
      product.photo.fileSize = photo.size;
      product.quantity = quantity;
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = req.product;
      await unlinkAsync(req.product.photo.filePath);
      await product.remove();
      res.json({ msg: "Product removed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().populate("category");
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
