import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SliderProductImage from "../../../components/SliderProductImage/SliderProductImage";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/laptop/${id}`
    );
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
          <Grid container spacing={1} paddingBottom={2}>
            <Grid item md={6} xs={12}>
              <Box>
                <SliderProductImage images={data?.images} />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h3">{data?.product?.name}</Typography>
              <div>
                <Button>-</Button>
                <input type="text" />
                <Button>+</Button>
              </div>
              <Box></Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
