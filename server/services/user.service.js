const db = require("../utils/database");

module.exports.findAll = () => {
  return db.execute("SELECT * FROM users");
};

module.exports.findOne = (id) => {
  return db.execute("SELECT * FROM users WHERE userId = ?", [id]);
};

module.exports.findOneByEmail = (email) => {
  return db.execute("SELECT * FROM users WHERE email = ?", [email]);
};

module.exports.create = (
  lastName,
  firstName,
  email,
  password,
  birthDate,
  gender,
  phone
) => {
  return db.execute(
    "INSERT INTO users( lastName, firstName, email, password, birthDate, gender, phone) VALUES(?,?,?,?,?,?,?)",
    [lastName, firstName, email, password, birthDate, gender, phone]
  );
};

module.exports.update = (userId, isLogin) => {
  console.log(userId, isLogin);
  return db.execute(
    "UPDATE `db_fpt`.`users` SET `is_login` = ? WHERE (`user_id` = ?)",
    [isLogin, userId]
  );
};

module.exports.remove = (id) => {
  return db.execute("DELETE FROM users WHERE userId = ?", [id]);
};
