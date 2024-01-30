const jwt = require("jsonwebtoken");
const user = require("./user");
const Service = require("./service");


const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const authenticatedUser = await user.findByPk(decoded.userId);
    if (!authenticatedUser) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = authenticatedUser;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const createService = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { serviceName, type, price } = req.body;
    const created = await Service.create({
      categoryId,
      serviceName,
      type,
      price,
    });
    res.status(201).json({ message: "Service created", created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getServices = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const findAllData = await Service.findAll({
      where: { categoryId },
    });
    res.status(200).json(findAllData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateServiceById = async (req, res) => {
  const { categoryId, serviceId } = req.params;
  const { serviceName, type, price } = req.body;

  try {
    const service = await Service.findByPk(serviceId);

    if (!service || service.categoryId !== categoryId) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    
    await service.update({ serviceName, type, price });

    res.json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error("Error updating service by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteServiceById = async (req, res) => {
  const { categoryId, serviceId } = req.params;

  try {
    const service = await Service.findByPk(serviceId);

    if (!service || service.categoryId !== categoryId) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
      await service.destroy();
      
      res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createService,
  getServices,
  updateServiceById,
  deleteServiceById,
  authenticateUser,
};
