import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";
import slide3 from "../../assets/images/slide3.webp";
import slide4 from "../../assets/images/slide4.webp";
import slide5 from "../../assets/images/slide5.webp";
import slide6 from "../../assets/images/slide6.webp";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import "./SliderComp.css";
function SliderComp() {
  const settings = {
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <>
      <Grid container className="bg-color-white" marginBottom={3}>
        <Grid item xs={12}>
          <Slider asNavFor={nav2} ref={slider1}>
            <Box>
              <img style={{ width: "100%" }} src={slide1} alt="" />
            </Box>
            <Box>
              <img style={{ width: "100%" }} src={slide2} alt="" />
            </Box>
            <Box>
              <img style={{ width: "100%" }} src={slide3} alt="" />
            </Box>
            <Box>
              <img style={{ width: "100%" }} src={slide4} alt="" />
            </Box>
            <Box>
              <img style={{ width: "100%" }} src={slide5} alt="" />
            </Box>
            <Box>
              <img style={{ width: "100%" }} src={slide6} alt="" />
            </Box>
          </Slider>
        </Grid>
        <Grid item xs={12}>
          <Slider
            {...settings}
            asNavFor={nav1}
            ref={slider2}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            arrows={false}
            className="l-slider"
          >
            <Box padding={2}>
              <Typography align="center">
                Realme C55 chỉ từ 3.890.000đ
              </Typography>
            </Box>
            <Box padding={2}>
              <Typography align="center">
                Z Fold5 | Z Flip5 giảm 5 triệu
              </Typography>
            </Box>
            <Box padding={2}>
              <Typography align="center">
                iPhone 14 Pro Max giảm đến 5.5 triệu
              </Typography>
            </Box>
            <Box padding={2}>
              <Typography align="center">
                Xiaomi Google TV từ 3.990.000đ
              </Typography>
            </Box>
            <Box padding={2}>
              <Typography align="center">
                Sắm Robot hút bụi Ecovacs ngay
              </Typography>
            </Box>
            <Box padding={2}>
              <Typography align="center">
                Redmi Note 12 giá sốc 3.890.000đ
              </Typography>
            </Box>
          </Slider>
        </Grid>
      </Grid>
    </>
  );
}

export default SliderComp;
