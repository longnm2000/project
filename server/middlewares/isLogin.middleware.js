const jwt = require("jsonwebtoken");
const userServices = require("../services/user.service");

module.exports.isLogin = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1].trim();
    let result = jwt.verify(token, process.env.TOKEN_SECRET);

    let { id } = result.data;
    let [user] = await userServices.findOne(id);
    if (+user[0].isLogin === 1) {
      res.locals.middlewareData = id;
      next();
    } else {
      res.status(203).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};
