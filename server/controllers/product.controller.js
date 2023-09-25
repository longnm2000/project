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
