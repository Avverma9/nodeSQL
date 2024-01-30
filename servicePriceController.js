const ServicePriceOptions = require("./servicePrice");

const createServicePriceOption = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { duration, price, type } = req.body;
    const created = await ServicePriceOptions.create({
      serviceId,
      duration,
      price,
      type,
    });
    res.status(201).json({ message: "Service Price Option created", created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getServicePriceOptions = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const findAllData = await ServicePriceOptions.findAll({
      where: { serviceId },
    });
    res.status(200).json(findAllData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateServicePriceOptionById = async (req, res) => {
  const { serviceId, optionId } = req.params;
  const { duration, price, type } = req.body;

  try {
    const option = await ServicePriceOptions.findByPk(optionId);

    if (!option || option.serviceId !== serviceId) {
      res.status(404).json({ error: "Service Price Option not found" });
      return;
    }

    await option.update({ duration, price, type });

    res.json({ message: "Service Price Option updated successfully", option });
  } catch (error) {
    console.error("Error updating service price option by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteServicePriceOptionById = async (req, res) => {
  const { serviceId, optionId } = req.params;

  try {
    const option = await ServicePriceOptions.findByPk(optionId);

    if (!option || option.serviceId !== serviceId) {
      res.status(404).json({ error: "Service Price Option not found" });
      return;
    }

    await option.destroy();

    res.json({ message: "Service Price Option deleted successfully" });
  } catch (error) {
    console.error("Error deleting service price option by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createServicePriceOption,
  getServicePriceOptions,
  updateServicePriceOptionById,
  deleteServicePriceOptionById,
};
