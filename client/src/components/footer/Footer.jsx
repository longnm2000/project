import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <>
      <Container className="bg-color-white">
        <Typography fontSize={24} fontWeight={"bold"} marginY={2}>
          Hệ thống cửa hàng
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Box padding={2} className="bg-color-green" borderRadius={2}>
              <Typography fontWeight={"bold"} marginBottom={1}>
                Thành phố Hồ Chí Minh
              </Typography>
              <Typography>
                Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh
              </Typography>
              <Typography>Mở cửa</Typography>
              <Typography>09:00 - 21:00</Typography>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box padding={2} className="bg-color-green" borderRadius={2}>
              <Typography fontWeight={"bold"} marginBottom={1}>
                Thành phố Hồ Chí Minh
              </Typography>
              <Typography>
                Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh
              </Typography>
              <Typography>Mở cửa</Typography>
              <Typography>09:00 - 21:00</Typography>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box padding={2} className="bg-color-green" borderRadius={2}>
              <Typography fontWeight={"bold"} marginBottom={1}>
                Thành phố Hồ Chí Minh
              </Typography>
              <Typography>
                Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh
              </Typography>
              <Typography>Mở cửa</Typography>
              <Typography>09:00 - 21:00</Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography fontSize={24} fontWeight={"bold"} marginY={2}>
          ThinkPro
        </Typography>
        <Grid container spacing={1} marginBottom={2}>
          <Grid item md={3} xs={12}>
            <Box
              padding={2}
              className="bg-color-green"
              borderRadius={2}
              height={"100%"}
            >
              <Typography fontWeight={"bold"}>Đa dạng thanh toán</Typography>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-rotate"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Chuyển khoản</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-money-bill"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography> Tiền mặt</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-credit-card"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Thẻ ATM</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-globe"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Thẻ quốc tế</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              padding={2}
              className="bg-color-green"
              borderRadius={2}
              height={"100%"}
            >
              {" "}
              <Typography fontWeight={"bold"}>Thông tin hữu ích</Typography>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-circle-check"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Chính sách bảo hàng</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-rotate"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Chính sách đổi trả</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-truck"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Chính sách vận chuyển</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-shield"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Chính sách bảo mật</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-credit-card"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Chính sách thanh toán</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-barcode"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Chính sách kiểm hàng</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-bag-shopping"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Hướng dẫn mua hàng online</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-solid fa-circle-info"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Thông tin vè chúng tôi</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              padding={2}
              className="bg-color-green"
              borderRadius={2}
              height={"100%"}
            >
              {" "}
              <Typography fontWeight={"bold"}>Social networks</Typography>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-brands fa-facebook"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Facebook</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-brands fa-youtube"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Youtube</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-brands fa-tiktok"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Tiktok</Typography>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item>
                  <Box width={30}>
                    {" "}
                    <Typography align="center">
                      <i className="fa-brands fa-telegram"></i>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>Telegram</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              padding={2}
              className="bg-color-green"
              borderRadius={2}
              height={"100%"}
            >
              <Typography fontWeight={"bold"}>
                Phản hồi, góp ý, khiếu nại
              </Typography>
              <Typography>
                Phản hồi nóng về chất lượng sản phẩm và dịch vụ. Đội ngũ Kiểm
                Soát Chất Lượng của chúng tôi sẵn sàng lắng nghe quý khách.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <hr />
        <Typography marginTop={2} fontSize={12}>
          Công ty TNHH Công nghệ Think Việt Nam - GPĐKKD: 0107273909 do sở KH &
          ĐT TP Hà Nội cấp ngày 09/03/2020
        </Typography>
        <Typography marginY={2} fontSize={12}>
          Địa chỉ: 105/562 Đường Láng, Phường Láng Hạ, Quận Đống Đa, Hà Nội.
          Điện thoại: 1900633579
        </Typography>
      </Container>
    </>
  );
}

export default Footer;
