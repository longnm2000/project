import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SliderProductImage from "../../../components/SliderProductImage/SliderProductImage";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import numeral from "numeral";

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/laptops/${id}`
    );
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  let decoded = null;
  if (localStorage.getItem("token")) {
    decoded = jwtDecode(localStorage.getItem("token"));
  }

  const productAvatar = data?.images?.find((e) => +e.type === 1);
  const handleAddToCart = () => {
    if (localStorage.getItem("token")) {
      const cartItem = {
        productId: +id,
        userId: +decoded.data.id,
        productName: data.product.name,
        price: +data.product.price,
        image: productAvatar.source,
        cpu: data.product.cpu,
        card: data.product.card,
        ram: data.product.ram,
        ssd: data.product.ssd,
        screenSize: data.product.screenSize,
        screenResolution: data.product.screenResolution,
      };
      console.log(cartItem);

      // Lấy danh sách sản phẩm trong giỏ hàng từ local storage
      const existingCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const itemIndex = existingCartItems.findIndex(
        (item) => +item.productId === +cartItem.productId
      );
      console.log(itemIndex);

      if (itemIndex !== -1) {
        // Cập nhật số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
        existingCartItems[itemIndex].quantity += 1;
      } else {
        // Thêm sản phẩm vào giỏ hàng nếu chưa tồn tại
        cartItem.quantity = 1;
        existingCartItems.push(cartItem);
      }

      // Lưu danh sách sản phẩm đã cập nhật vào local storage
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
      Swal.fire({
        icon: "success",
        title: "Sản phẩm đã được thêm vào giỏ hàng",
        timer: "1000",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng",
        timer: 1000,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-color-green">
        <Container>
          <Box paddingY={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <Button component={Link} to={"/"}>
                Trang chủ
              </Button>
              <Button component={Link} to={"/laptop"}>
                Laptop
              </Button>
              <Button component={Link} to={`/laptop/${id}`}>
                {data?.product?.name}
              </Button>
            </Breadcrumbs>
          </Box>
          <Grid container spacing={2} paddingBottom={2}>
            <Grid item md={6} xs={12}>
              <Box>
                <SliderProductImage images={data?.images} />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <Typography variant="h3">{data?.product?.name}</Typography>
                <Typography
                  color={"error"}
                  fontSize={23}
                  fontWeight={"bold"}
                  marginY={2}
                >
                  Giá bán: {numeral(data?.product?.price).format("0, ")} VND
                </Typography>
                <Box>
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    color="error"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Box>
                <Box
                  bgcolor={"white"}
                  padding={2}
                  marginTop={3}
                  borderRadius={2}
                >
                  <Typography variant="h6">Thông tin sản phẩm:</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary={"CPU: " + data?.product.cpu} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"GPU: " + data?.product.card} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`RAM: ${data?.product.ram} GB ${data?.product.ramType}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`SSD: ${data?.product.ssd} GB`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Màn hình: ${data?.product.screenSize} inches ${data?.product.screenResolution} ${data?.product.refeshRate} Hz`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={"Cân nặng: " + data?.product.weight + " Kg"}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
