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

module.exports.findAllOrders = () => {
  return db.execute(
    `SELECT o.*, u.firstName,u.lastName FROM orders o INNER JOIN users u ON o.userId = u.userId  order by status asc, orderDate desc`
  );
};
module.exports.findOneOrderDetail = (id) => {
  return db.execute(
    `SELECT
    o.*,
    od.*,
    u.userId,u.lastName, u.firstName
FROM
    orders o
INNER JOIN
    orderdetails od ON o.orderId = od.orderId
INNER JOIN
    users u ON o.userId = u.userId
WHERE
	o.orderId = ?
`,
    [id]
  );
};

module.exports.updateStatus = (value, id) => {
  return db.execute(`UPDATE orders SET status = ? WHERE orderId = ?`, [
    value,
    id,
  ]);
};
