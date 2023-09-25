const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.SERVER_PORT;

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/laptops", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
