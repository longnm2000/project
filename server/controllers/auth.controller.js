const moment = require("moment");
const authService = require("../services/auth.service");

module.exports.signUp = async (req, res) => {
  let { lastName, firstName, email, password, birthDate, gender, phone } =
    req.body;
  const formattedBirthday = moment(
    birthDate,
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  ).format("YYYY-MM-DD");

  try {
    let result = await authService.signUp(
      lastName,
      firstName,
      email,
      password,
      formattedBirthday,
      +gender,
      phone
    );
    console.log(result);
    if (result?.status === 409) {
      res.status(200).json({
        message: "Duplicate email",
      });
    } else {
      res.status(201).json({
        message: "Sign up successfully",
      });
    }
  } catch (error) {
    console.error("Error while signing up:", error);
    res.json({
      message: "Failed to sign up",
      error: error.message,
      status: 500,
    });
  }
};

module.exports.signIn = async (req, res) => {
  let { email, password } = req.body;
  try {
    let result = await authService.signIn(email, password);
    res.json(result);
  } catch (error) {
    res.json({
      message: "Failed to sign in",
      error: error.message,
      status: 500,
    });
  }
};

// module.exports.signInAdmin = async (req, res) => {
//   let { email, password } = req.body;
//   try {
//     let result = await authService.signInAdmin(email, password);
//     res.json(result);
//   } catch (error) {
//     res.json({
//       message: "Failed to sign in",
//       error: error.message,
//       status: 500,
//     });
//   }
// };

// module.exports.signupAdmin = async (req, res) => {
//   let { name, email, password, role } = req.body;
//   try {
//     await authService.signupAdmin(name, email, password, role);
//     res.status(201).json({
//       message: "Sign up successfully",
//       status: 201,
//     });
//   } catch (error) {
//     console.error("Error while signing up:", error);
//     res.json({
//       message: "Failed to sign up",
//       error: error.message,
//       status: 500,
//     });
//   }
//};
