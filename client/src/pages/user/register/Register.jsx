import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@mui/material";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

const schema = yup.object().shape({
  lastName: yup.string().required("Họ là bắt buộc"),
  firstName: yup.string().required("Tên là bắt buộc"),
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
    .max(100, "Email không dài quá 100 ký tự"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(100, "Mật khẩu không quá 100 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*?&]{8,100}$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt không quá 100 ký tự"
    )
    .required("Vui lòng nhập mật khẩu"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Vui lòng nhập số điện thoại"),
  birthDate: yup
    .date()
    .nullable()
    .transform((currentValue, originalValue) => {
      if (originalValue === "") {
        return null;
      }
      return currentValue;
    })
    .required("Vui lòng chọn ngày sinh"),
  gender: yup.number().required("Vui lòng chọn giới tính"),
});

export default function Register() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      axios
        .post("http://localhost:8080/api/v1/auth/sign-up", data)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Đăng nhập thành công!",
              text: "Tự động chuyển về trang đăng nhập",
              timer: 1000,
            }).then(navigate("/login"));
          } else if (res.status === 200) {
            Swal.fire({
              icon: "error",
              title: "Email đã được sử dụng!",
              timer: 1000,
            });
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Họ"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tên"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Mật khẩu"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="birthDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        fullWidth
                        label="Ngày sinh"
                        format="DD-MM-YYYY"
                        disableFuture
                      />
                    </LocalizationProvider>
                  )}
                />
                {!!errors.birthDate ? (
                  <FormHelperText error>
                    Vui lòng chọn ngày sinh hợp lệ
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.gender}>
                      <InputLabel>Giới tính</InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Giới tính"
                      >
                        <MenuItem value={0}>Nam</MenuItem>
                        <MenuItem value={1}>Nữ</MenuItem>
                        <MenuItem value={2}>Khác</MenuItem>
                      </Select>
                      {!!errors.gender ? (
                        <FormHelperText>Vui lòng chọn giới tính</FormHelperText>
                      ) : (
                        <></>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Số điện thoại"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button component={Link} to={"/login"}>
                  Có tài khoản? Đăng nhập
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
