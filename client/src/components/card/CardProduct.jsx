import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./CardProduct.css";
import { Link } from "react-router-dom";
import numeral from "numeral";
function CardProduct({ product }) {
  return (
    <Link to={`/laptop/${product.productId}`} className="card-link">
      <Card className="card-product">
        <CardMedia
          component="img"
          alt={product.productName}
          image={product.productImage}
          title={product.productName}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.productName}
          </Typography>
          <Typography variant="h6" color="red">
            {numeral(product.price).format("0, ")} VND
          </Typography>
          <Typography>
            <b>CPU:</b> {product.cpu}
          </Typography>
          <Typography>
            <b>GPU:</b> {product.card}
          </Typography>
          <Typography>
            <b>RAM:</b> {product.ram} GB
          </Typography>
          <Typography>
            <b>SSD:</b> {product.ssd} GB
          </Typography>
          <Typography>
            <b>Màn hình:</b> {product.screenSize} inches{" "}
            {product.screenResolution} {product.refeshRate} Hz
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardProduct;
