const bcrypt = require("bcrypt");

const Category = require("./category");
const user = require("./user");

//JWT PART

const createUser = async (req, res) => {
  const { Username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      Username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//============================
const signIn = async (req, res) => {
  const { Username, password } = req.body;
  try {
    const userData = await user.findOne({ where: { Username } });
    if (!userData) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const createCategory = async (req, res) => {
  const { categoryName ,userId} = req.body;
  

  try {
    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const newCategory = await Category.create({
      categoryName,
      userId,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategory = async (req, res) => {
 
const {userId} = req.body
  try {
    const categories = await Category.findAll({
      where: { userId },
    });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;
  const userId = req.user.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    if (category.userId !== userId) {
      res
        .status(403)
        .json({ error: "You don't have permission to update this category" });
      return;
    }

    await category.update({ categoryName });

    res.json(category);
  } catch (error) {
    console.error("Error updating category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const userId = req.user.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    if (category.userId !== userId) {
      res
        .status(403)
        .json({ error: "You don't have permission to delete this category" });
      return;
    }

    await category.destroy();

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  signIn,
  getCategory,
  createCategory,
  updateCategoryById,
  deleteCategoryById,

};
