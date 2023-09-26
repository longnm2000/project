const productServices = require("../services/product.service");
module.exports.findAll = async (req, res) => {
  try {
    const [rows] = await productServices.findAll();
    res.status(200).json({
      status: "success",
      products: rows,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await productServices.findOneById(id);
    const [images] = await productServices.findProductImages(id);
    res.status(200).json({
      status: "success",
      product: product[0],
      images,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await productServices.deleteProduct(id);
    res.status(200).json({
      status: "success",
      message: `Delete the product has productId = ${id} successfully`,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findAllManufacturers = async (req, res) => {
  try {
    const [result] = await productServices.findAllManufacturers();
    res.status(200).json({
      status: "success",
      manufacturers: result,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.addProduct = async (req, res) => {
  let {
    manufacturer,
    name,
    cpu,
    gpu,
    ram,
    ramType,
    ssd,
    screenSize,
    screenResolution,
    refreshRate,
    screenType,
    pin,
    weight,
    quantity,
    price,
    avatar,
    optionalImages,
  } = req.body;
  try {
    const [result] = await productServices.addProduct(
      manufacturer,
      name,
      cpu,
      gpu,
      ram,
      ramType,
      ssd,
      screenSize,
      screenResolution,
      refreshRate,
      screenType,
      pin,
      weight,
      quantity,
      price
    );
    await productServices.addAvatar(result.insertId, avatar);
    if (optionalImages.length !== 0) {
      await productServices.addOptionalImages(result.insertId, optionalImages);
    }
    res.status(201).json({
      status: "success",
      message: "Add new product successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.deleteManufacturer = async (req, res) => {
  let { id } = req.params;
  try {
    await productServices.deleteManufacturer(id);
    res.status(200).json({
      status: "success",
      message: `Delete manufacturer has id = ${id} successfully!`,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.addManufacturer = async (req, res) => {
  let { name } = req.body;
  try {
    const [result] = await productServices.addManufacturer(name);
    if (!!result.insertId) {
      res.status(201).json({
        status: "success",
        message: "Add new product successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findOneManufacturer = async (req, res) => {
  let { id } = req.params;
  try {
    const [result] = await productServices.findOneManufacturer(id);
    res.status(200).json({
      status: "sucess",
      manufacturer: result,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.updateManufacturer = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  try {
    await productServices.updateManufacturer(id, name);
    res.status(200).json({
      status: "sucess",
      message: `Update manufacturer has id = ${id} successfully!`,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  let { id } = req.params;
  let {
    manufacturer,
    name,
    cpu,
    gpu,
    ram,
    ramType,
    ssd,
    screenSize,
    screenResolution,
    refreshRate,
    screenType,
    pin,
    weight,
    quantity,
    price,
    avatar,
  } = req.body;

  try {
    await productServices.updateProduct(
      manufacturer,
      name,
      cpu,
      gpu,
      ram,
      ramType,
      ssd,
      screenSize,
      screenResolution,
      refreshRate,
      screenType,
      pin,
      weight,
      quantity,
      price,
      id
    );
    await productServices.updateAvatar(id, avatar);
    res.status(200).json({
      status: "sucess",
      message: `Update product has id = ${id} successfully!`,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
