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
  let { id } = req.params;
  console.log(id);
  try {
    const [product] = await productServices.findOneById(id);
    const [images] = await productServices.findProductImages(id);
    console.log(images, product);
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
