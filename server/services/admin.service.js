const db = require("../utils/database");

module.exports.findOneByEmail = (email) => {
  return db.execute("SELECT * FROM admins WHERE email = ?", [email]);
};

module.exports.create = (email, password) => {
  return db.execute("INSERT INTO admins(email, password) VALUES(?,?)", [
    email,
    password,
  ]);
};
