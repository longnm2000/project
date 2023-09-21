const bcrypt = require("bcrypt");
const userService = require("./user.service");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (
  lastName,
  firstName,
  email,
  password,
  birthDate,
  gender,
  phone
) => {
  const [result] = await userService.findOneByEmail(email);
  if (result.length === 0) {
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);

    return userService.create(
      lastName,
      firstName,
      email,
      hashPassword,
      birthDate,
      gender,
      phone
    );
  } else {
    return {
      message: "Email exists ready!",
      status: 409,
    };
  }
};

module.exports.signIn = async (email, password) => {
  try {
    let findUser = await userService.findOneByEmail(email);
    let [rows] = findUser;
    if (rows.length === 0) {
      return {
        status: 404,
        message: "User not found",
      };
    } else {
      if (rows[0].isLogin === 1) {
        let hashPassword = rows[0].password;
        let compare = bcrypt.compareSync(password, hashPassword);
        if (!compare) {
          return {
            status: 401,
            message: "Incorrect password",
          };
        } else {
          let access_token = jwt.sign(
            {
              data: {
                id: rows[0].userId,
                email: rows[0].email,
                firstName: rows[0].lastName,
                lastName: rows[0].lastName,
              },
            },
            process.env.TOKEN_SECRET,
            { expiresIn: 12000 }
          );
          return {
            status: 200,
            message: "Sign in successful",
            access_token,
          };
        }
      } else {
        return {
          status: 201,
          message: "Sign in is denied",
        };
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

// module.exports.signupAdmin = (name, email, password, role) => {
//   let salt = bcrypt.genSaltSync(10);
//   let hashPassword = bcrypt.hashSync(password, salt);
//   return adminService.create(name, email, hashPassword, role);
// };

// module.exports.signInAdmin = async (email, password) => {
//   try {
//     let findUser = await adminService.findOneByEmail(email);
//     let [rows] = findUser;
//     if (rows.length === 0) {
//       return {
//         status: 404,
//         message: "Admin not found",
//       };
//     } else {
//       let hashPassword = rows[0].password;
//       let compare = bcrypt.compareSync(password, hashPassword);

//       if (!compare) {
//         return {
//           status: 401,
//           message: "Incorrect password",
//         };
//       } else {
//         let access_token = jwt.sign(
//           {
//             data: {
//               email: rows[0].email,
//               name: rows[0].admin_name,
//             },
//           },
//           process.env.TOKEN_SECRET,
//           { expiresIn: 12000 }
//         );
//         return {
//           status: 200,
//           message: "Sign in successful",
//           access_token,
//         };
//       }
//     }
//   } catch (error) {
//     return {
//       status: 500,
//       message: "Internal server error",
//     };
//   }
// };
