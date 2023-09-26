const orderServices = require("../services/order.service");

module.exports.addOrder = async (req, res) => {
  try {
    const { totalAmount, shippingAddress, orderDetails } = req.body;
    const userId = res.locals.middlewareData;
    const [orderResult] = await orderServices.addOrder(
      userId,
      totalAmount,
      shippingAddress
    );
    const orderId = orderResult.insertId;
    const orderDetailValues = orderDetails.map((item) => [
      orderId,
      item.productId,
      item.productName,
      item.price,
      item.image,
      item.cpu,
      item.card,
      item.ram,
      item.ssd,
      item.screenSize,
      item.screenResolution,
      item.quantity,
    ]);
    await orderServices.addOrderDetail(orderDetailValues);
    res.status(201).json({
      message: "Add order detail successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findAllOrders = async (req, res) => {
  try {
    let data = await orderServices.findAllOrders();
    let [rows] = data;

    res.json({
      status: "success",
      orders: rows,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findOneOrderDetail = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await orderServices.findOneOrderDetail(+id);
    let [rows] = data;

    res.json({
      status: "success",
      orderDetail: rows,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.updateStatus = async (req, res) => {
  let { id } = req.params;
  let { value } = req.body;
  try {
    await orderServices.updateStatus(+value, +id);
    res.status(200).json({
      message: "Update status login successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findAllOrdersByUserId = async (req, res) => {
  let { id } = req.params;
  try {
    let [result] = await orderServices.findAllOrdersByUserId(id);
    res.status(200).json({
      status: "success",
      orders: result,
    });
  } catch (error) {}
};
