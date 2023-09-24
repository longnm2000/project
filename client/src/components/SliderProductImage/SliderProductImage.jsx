import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Box, Grid } from "@mui/material";
function SliderProductImage({ images }) {
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
      <Grid container className="bg-color-white">
        <Grid item xs={12}>
          <Slider asNavFor={nav2} ref={slider1}>
            {images?.map((e, i) => (
              <Box key={i}>
                <img style={{ width: "100%" }} src={e.source} alt="" />
              </Box>
            ))}
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
            {images?.map((e, i) => (
              <div key={i}>
                <img src={e.source} alt="" width={"100%"} />
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </>
  );
}

export default SliderProductImage;
