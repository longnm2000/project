const db = require("../utils/database");

module.exports.addOrder = (userId, totalAmount, shippingAddress) => {
  return db.execute(
    `INSERT INTO orders (userId, totalAmount, shippingAddress) VALUES (?, ?, ?)`,
    [userId, totalAmount, shippingAddress]
  );
};

module.exports.addOrderDetail = (orderDetailValues) => {
  const placeholders = orderDetailValues
    .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .join(",");
  const values = orderDetailValues
    .flat()
    .map((value) => (value !== undefined ? value : null));
  console.log(values);
  const sql = `INSERT INTO orderdetails ( orderId,
    productId,
    productName,
    price,
    image,
    cpu,
    card,
    ram,
    ssd,
    screenSize,
    screenResolution,
    quantity) VALUES ${placeholders}`;

  return db.execute(sql, values);
};
