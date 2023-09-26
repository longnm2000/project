import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import Footer from "../../../components/footer/Footer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import numeral from "numeral";

function OrderHistory() {
  let decoded = null;
  const [data, setData] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [show, setShow] = useState(false);
  if (!!localStorage.getItem("token")) {
    decoded = jwtDecode(localStorage.getItem("token"));
  }
  console.log(decoded);
  const fetchData = async () => {
    if (!!decoded) {
      console.log(decoded.data.id);
      const response = await axios.get(
        `http://localhost:8080/api/v1/orders/users/${decoded?.data?.id}`
      );
      setData(response.data.orders);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDetail = async (id) => {
    handleShow();
    const response = await axios.get(
      `http://localhost:8080/api/v1/orders/${id}`
    );
    setOrderDetail(response.data.orderDetail);
  };
  return (
    <>
      <Header />
      <Box className="bg-color-green" paddingY={3}>
        <Dialog
          open={show}
          onClose={handleClose}
          fullScreen
          aria-labelledby="contained-modal-title-vcenter"
          PaperProps={{
            sx: {
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#f0f0f0",
              borderBottom: "1px solid #ddd",
              padding: "16px",
            }}
          >
            Order Detail
          </DialogTitle>
          <DialogContent sx={{ padding: "16px" }}>
            {orderDetail?.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  width="80px"
                  height="auto"
                  style={{ marginRight: "16px" }}
                />
                <div>
                  <Typography variant="subtitle1" className="fw-bold">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2">
                    <span className="fw-bold">CPU:</span> {item.cpu} GB
                  </Typography>
                  <Typography variant="body2">
                    <span className="fw-bold">GPU:</span> {item.card} GB
                  </Typography>
                  <Typography variant="body2">
                    <span className="fw-bold">RAM:</span> {item.ram} GB
                  </Typography>
                  <Typography variant="body2">
                    <span className="fw-bold">SSD:</span> {item.ssd} GB
                  </Typography>
                  <Typography variant="body2">
                    <span className="fw-bold">Screen:</span> {item.screenSize}{" "}
                    {item.screenResolution}
                  </Typography>
                  <Typography variant="body2">
                    <span className="fw-bold">Quantity:</span> {item.quantity}
                  </Typography>
                </div>
              </div>
            ))}
          </DialogContent>

          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Container>
          <Typography variant="h5" marginTop={2}>
            LỊCH SỬ MUA HÀNG
          </Typography>
          <Box>
            {data?.map((e, i) => (
              <Box
                key={i}
                marginY={2}
                className="bg-color-white"
                padding={2}
                borderRadius={2}
              >
                <Typography>
                  Thời gian đặt hàng:{" "}
                  {moment(e.orderDate).format("DD-MM-YYYY HH:mm:ss")}.
                </Typography>
                <Typography>Địa chỉ giao hàng: {e.shippingAddress}</Typography>
                <Typography>
                  Tổng tiền: {numeral(e.totalAmount).format("0,")} VND
                </Typography>
                <Typography>
                  Tình trạng:{" "}
                  {e.status === 0
                    ? "Đang xử lý"
                    : e.status === 1
                    ? "Đang giao hàng"
                    : e.status === 2
                    ? "Đã giao hàng"
                    : "Đã bị huỷ"}
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => handleDetail(e.orderId)}
                  >
                    Xem chi tiết
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default OrderHistory;
