const express = require("express");
const router = express.Router();
const Category = require("./categoryController");
const service = require("./serviceController");
const ServicePriceController = require("./servicePriceController");

router.post("/register", Category.createUser);
router.post("/login", Category.signIn);

router.use(Category.authenticateUser);
router.post("/category", Category.createCategory);
router.get("/categories", Category.getCategory);
router.put("/category/:categoryId", Category.updateCategoryById);
router.delete("/category/:categoryId", Category.deleteCategoryById);

// Services routes
router.use(service.authenticateUser);
router.post("/category/:categoryId/service", service.createService);

// Get Services within a Category
router.get("/category/:categoryId/services", service.getServices);

// Remove Service from Category
router.delete(
  "/category/:categoryId/service/:serviceId",
  service.deleteServiceById
);

// Update Service within a Category
router.put(
  "/category/:categoryId/service/:serviceId",
  service.updateServiceById
);

// Service Price Options routes
router.post(
  "/category/:categoryId/service/:serviceId/price",
  ServicePriceController.createServicePriceOption
);

// Get Service Price Options within a Service
router.get(
  "/category/:categoryId/service/:serviceId/prices",
  ServicePriceController.getServicePriceOptions
);

// Update Service Price Option within a Service
router.put(
  "/category/:categoryId/service/:serviceId/price/:optionId",
  ServicePriceController.updateServicePriceOptionById
);

// Remove Service Price Option from a Service
router.delete(
  "/category/:categoryId/service/:serviceId/price/:optionId",
  ServicePriceController.deleteServicePriceOptionById
);
module.exports = router;
