const db = require("../utils/database");
module.exports.findAll = () => {
  return db.execute(`SELECT p.productId,
    p.name AS productName,
    p.cpu,
    p.card,
    p.ram,
    p.ramType,
    p.ssd,
    p.screenSize,
    p.screenResolution,
    p.refeshRate,
    p.price,
	pic.source AS productImage
FROM products p
JOIN pictures pic ON p.productId = pic.productId WHERE pic.type = 1 LIMIT 8;`);
};

module.exports.findOneById = (id) => {
  return db.execute(`SELECT * FROM products WHERE productId = ?`, [id]);
};
module.exports.findProductImages = (id) => {
  return db.execute(`SELECT * FROM pictures WHERE productId = ?`, [id]);
};
