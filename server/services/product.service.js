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
    p.quantity,
    p.price,
    ma.name AS manufacturerName,
	pic.source AS productImage
FROM products p
JOIN pictures pic ON p.productId = pic.productId
JOIN manufacturers ma ON p.manufacturerId = ma.manufacturerId
WHERE pic.type = 1 ORDER BY createAt DESC`);
};

module.exports.findOneById = (id) => {
  return db.execute(
    "SELECT p.*, ma.`name` AS manufacturerName FROM products p INNER JOIN Manufacturers ma ON p.manufacturerId = ma.manufacturerId WHERE productId = ?",
    [id]
  );
};
module.exports.findProductImages = (id) => {
  return db.execute(`SELECT * FROM pictures WHERE productId = ?`, [id]);
};

module.exports.deleteProduct = (id) => {
  return db.execute(`DELETE FROM products WHERE productId = ?`, [id]);
};

module.exports.findAllManufacturers = () => {
  return db.execute("SELECT * FROM db_project.manufacturers;");
};

module.exports.findOneManufacturer = (id) => {
  return db.execute(
    "SELECT * FROM db_project.manufacturers WHERE manufacturerId = ?;",
    [id]
  );
};

module.exports.addProduct = (
  manufacturerId,
  name,
  cpu,
  card,
  ram,
  ramType,
  ssd,
  screenSize,
  screenResolution,
  refeshRate,
  screenType,
  pin,
  weight,
  quantity,
  price
) => {
  console.log(
    manufacturerId,
    name,
    cpu,
    card,
    ram,
    ramType,
    ssd,
    screenSize,
    screenResolution,
    refeshRate,
    screenType,
    pin,
    weight,
    quantity,
    price
  );
  return db.execute(
    `INSERT INTO products(manufacturerId,name,cpu,card,ram,ramType,ssd,screenSize,screenResolution,refeshRate,screenType,pin,weight,quantity,price) 
  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      manufacturerId,
      name,
      cpu,
      card,
      ram,
      ramType,
      ssd,
      screenSize,
      screenResolution,
      refeshRate,
      screenType,
      pin,
      weight,
      quantity,
      price,
    ]
  );
};

module.exports.addAvatar = (productId, avatar) => {
  db.execute("INSERT INTO pictures(productId,source,type) VALUES(?,?,?)", [
    productId,
    avatar,
    1,
  ]);
};

module.exports.addOptionalImages = (productId, optionalImages) => {
  const placeholders = optionalImages.map(() => "(?, ?)").join(",");
  const transformedArray = optionalImages.reduce((result, current) => {
    result.push(+productId, current);
    return result;
  }, []);
  console.log(placeholders);
  console.log(transformedArray);
  db.execute(
    `INSERT INTO pictures(productId,source) VALUES ${placeholders}`,
    transformedArray
  );
};

module.exports.deleteManufacturer = (id) => {
  db.execute("DELETE FROM Manufacturers WHERE manufacturerId = ?", [id]);
};

module.exports.addManufacturer = (name) => {
  db.execute("INSERT INTO Manufacturers(name) VALUES(?)", [name]);
};

module.exports.updateManufacturer = (id, name) => {
  db.execute("UPDATE Manufacturers SET name = ? WHERE manufacturerId = ?", [
    name,
    id,
  ]);
};

module.exports.updateProduct = (
  manufacturerId,
  name,
  cpu,
  card,
  ram,
  ramType,
  ssd,
  screenSize,
  screenResolution,
  refeshRate,
  screenType,
  pin,
  weight,
  quantity,
  price,
  id
) => {
  console.log(
    manufacturerId,
    name,
    cpu,
    card,
    ram,
    ramType,
    ssd,
    screenSize,
    screenResolution,
    refeshRate,
    screenType,
    pin,
    weight,
    quantity,
    price,
    id
  );
  return db.execute(
    `UPDATE products SET manufacturerId=?,name=?,cpu=?,card=?,ram=?,ramType=?,ssd=?,screenSize=?,screenResolution=?,refeshRate=?,screenType=?,pin=?,weight=?,quantity=?,price=?
  WHERE productId = ?`,
    [
      manufacturerId,
      name,
      cpu,
      card,
      ram,
      ramType,
      ssd,
      screenSize,
      screenResolution,
      refeshRate,
      screenType,
      pin,
      weight,
      quantity,
      price,
      id,
    ]
  );
};

module.exports.updateAvatar = (productId, avatar) => {
  return db.execute(
    "UPDATE pictures SET source = ? WHERE productId = ? AND type = 1",
    [avatar, productId]
  );
};
