const Category = require("../models/category");
const Product = require("../models/product");

module.exports = {
  findCategoryById: async (req, res, next, id) => {
    try {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }
      req.category = category;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { category } = req.body;
      if (!category) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      const newCategory = new Category({
        name: category,
      });
      const savedCategory = await newCategory.save();
      res.json(savedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  readCategory: async (req, res) => {
    try {
      const category = req.category;
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      const category = req.category;
      category.name = name;
      const savedCategory = await category.save();
      res.json(savedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = req.category;
      const existingProducts = await Product.find({ category });
      if (existingProducts.length >= 1) {
        return res.status(400).json({
          err: `Sorry. You cant delete ${category.name}. It has ${existingProducts.length} associated product(s).`,
        });
      } else {
        await category.remove();
        res.json({ msg: "Category deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
