import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import SliderComp from "../../../components/slider/SliderComp";
import Footer from "../../../components/footer/Footer";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import CardProduct from "../../../components/card/CardProduct";

function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/laptop");
      if (response.data) {
        setData(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <Header />
      <div className="bg-color-green">
        <Container>
          <SliderComp />
          <Typography variant="h4" marginBottom={2}>
            LAPTOP NỔI BẬT
          </Typography>
          <Grid container spacing={2} paddingBottom={3}>
            {data.map((e, i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
                <CardProduct product={e} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Home;
