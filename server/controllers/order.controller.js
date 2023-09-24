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
