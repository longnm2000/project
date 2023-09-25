import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "../../../components/ListItems/listItems";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import Chart from './Chart';
// import Deposits from "../../../components/Deposits/Deposits";
// import Orders from "../../../components/Orders/Orders";
import { useNavigate } from "react-router-dom";

// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../../components/Title/Title";

import axios from "axios";
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

import { Helmet } from "react-helmet";
import TablePagination from "@mui/material/TablePagination";
import jwtDecode from "jwt-decode";
// import { Col, Row } from "react-bootstrap";
import numeral from "numeral";
// import Form from "react-bootstrap/Form";

import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import moment from "moment";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function OrdersManager() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userName, setUserName] = useState("");
  let decoded = null;
  if (localStorage.getItem("admin_token")) {
    decoded = jwtDecode(localStorage.getItem("admin_token"));
  }

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleExit = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login-admin");
  };

  const [orders, setOrders] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(0);

  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/api/v1/orders")
      .then((res) => setOrders(res.data.orders))
      .catch((error) => console.log(error));
  };

  const loadName = (decoded) => {
    if (!!decoded) {
      setUserName(decoded.data.name);
    }
  };

  useEffect(() => {
    fetchData();
    loadName(decoded);
  }, []);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  const handleOrderDetail = async (order) => {
    setSelectedOrder(order);
    await axios
      .get(`http://localhost:8080/api/v1/orders/${order.orderId}`)
      .then((res) => setSelectedOrderDetail(res.data.orderDetail))
      .catch((error) => console.log(error));
    handleShow();
  };
  console.log(selectedOrderDetail);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination change event handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (value, id) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:8080/api/v1/orders/${id}`, { value: value })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({ icon: "success", title: "success", timer: 2000 });
              fetchData();
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    handleCloseUserMenu();
    setUserName("");
    localStorage.removeItem("admin_token");
    Swal.fire({
      icon: "success",
      title: "Đã đăng xuất thành công",
      timer: 2000,
    }).then(() => {
      navigate("/admin/login");
    });
  };
  const handleLogin = () => {
    handleCloseUserMenu();
    navigate("/admin/login");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>Orders Manager</title>
      </Helmet>
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
          {selectedOrder && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Order ID: {selectedOrder.orderId}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                User ID: {selectedOrder.userId}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                User Name: {selectedOrder.lastName} {selectedOrder.firstName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Order Date: {selectedOrder.order_date}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Total Amount: {numeral(selectedOrder.totalAmount).format("0,")}{" "}
                đ
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Shipping Address: {selectedOrder.shippingAddress}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Order Status:{" "}
                {selectedOrder.status === 0
                  ? "Pending"
                  : selectedOrder.status === 1
                  ? "Delivery"
                  : selectedOrder.status === 2
                  ? "Completed"
                  : "Canceled"}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Products:
              </Typography>
              {selectedOrderDetail?.map((item, i) => (
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
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color="inherit"
                >
                  {userName === "" ? (
                    <AccountCircleIcon sx={{ fontSize: 30 }} />
                  ) : (
                    <Avatar {...stringAvatar(userName)} />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!!decoded ? (
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLogin}>
                    <Typography textAlign="center">Log In</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  className="overflow-x-auto bg-white"
                >
                  <React.Fragment>
                    <Title>Orders</Title>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Order Id</TableCell>
                          <TableCell>User Id</TableCell>
                          <TableCell>User Name</TableCell>
                          <TableCell>Order Time</TableCell>
                          <TableCell>Total Amount (VND)</TableCell>
                          <TableCell>Order Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((order, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{order.orderId}</TableCell>
                              <TableCell>{order.userId}</TableCell>
                              <TableCell>
                                {order.lastName} {order.firstName}
                              </TableCell>
                              <TableCell>
                                {moment(order.orderDate).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                              </TableCell>
                              <TableCell>
                                {numeral(order.totalAmount).format("0,")}
                              </TableCell>
                              <TableCell>
                                {order.status === 0
                                  ? "Pending"
                                  : order.status === 1
                                  ? "Delivery"
                                  : order.status === 2
                                  ? "Completed"
                                  : "Canceled"}
                              </TableCell>
                              <TableCell>
                                <Box
                                  display={"flex"}
                                  flexDirection={"column"}
                                  gap={1}
                                >
                                  <Button
                                    variant="contained"
                                    onClick={() => handleOrderDetail(order)}
                                    className="w-100 mb-2"
                                  >
                                    Detail
                                  </Button>

                                  <Select
                                    size="small"
                                    value={order.status}
                                    disabled={
                                      order.status === 3 || order.status === 2
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e.target.value,
                                        order.orderId
                                      )
                                    }
                                  >
                                    <MenuItem value={0}>Pending</MenuItem>
                                    <MenuItem value={1}>Delivery</MenuItem>
                                    <MenuItem value={2}>Completed</MenuItem>
                                    <MenuItem value={3}>Canceled</MenuItem>
                                  </Select>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={orders?.length || 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
