import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControl, InputLabel, FormHelperText } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

const defaultTheme = createTheme();

const schema = yup.object().shape({
  manufacturer: yup.string().required("Manufacturer is required"),
  name: yup.string().required("Name is required"),
  cpu: yup.string().required("CPU is required"),
  gpu: yup.string().required("GPU is required"),
  ram: yup.string().required("RAM Capacity is required"),
  ramType: yup.string().required("RAM Type is required"),
  ssd: yup.string().required("SSD Capacity is required"),
  screenSize: yup.string().required("Screen Size is required"),
  screenResolution: yup.string().required("Screen Resolution is required"),
  refreshRate: yup.string().required("Refresh Rate is required"),
  screenType: yup.string().required("Screen Type is required"),
  pin: yup.string().required("Pin is required"),
  weight: yup.string().required("Weight is required"),
  quantity: yup.number().required("Quantity is required").positive().integer(),
  price: yup.number().required("Price is required").positive(),
});

export default function AddProduct() {
  const [manufacturer, setManufacturer] = useState([]);
  const [selectManufacturer, setSelectManufacturer] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/laptops/manufacturers"
    );
    setManufacturer(response.data.manufacturers);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            Add a product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Box marginTop={2}>
                  <Controller
                    defaultValue=""
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Name"
                        error={!!errors?.name}
                        helperText={errors?.name?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  <Controller
                    defaultValue=""
                    name="cpu"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="CPU"
                        error={!!errors?.cpu}
                        helperText={errors?.cpu?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  <Controller
                    defaultValue=""
                    name="gpu"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="gpu"
                        error={!!errors?.gpu}
                        helperText={errors?.gpu?.message}
                      />
                    )}
                  />
                </Box>

                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="ram"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="RAM Capacity"
                        error={!!errors?.ram}
                        helperText={errors?.ram?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="ramType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="RAM Type"
                        error={!!errors?.ramType}
                        helperText={errors?.ramType?.message}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="ssd"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="SSD Capacity"
                        error={!!errors?.ssd}
                        helperText={errors?.ssd?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="screenSize"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Screen Size"
                        error={!!errors?.screenSize}
                        helperText={errors?.screenSize?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  <Controller
                    defaultValue=""
                    name="screenResolution"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Screen Resolution"
                        error={!!errors?.screenResolution}
                        helperText={errors?.screenResolution?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="refreshRate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Refresh Rate"
                        error={!!errors?.refreshRate}
                        helperText={errors?.refreshRate?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="screenType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Screen Type"
                        error={!!errors?.screenType}
                        helperText={errors?.screenType?.message}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="pin"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Pin"
                        error={!!errors?.pin}
                        helperText={errors?.pin?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="weight"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Weight"
                        error={!!errors?.weight}
                        helperText={errors?.weight?.message}
                      />
                    )}
                  />
                </Box>

                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Quantity"
                        error={!!errors?.quantity}
                        helperText={errors?.quantity?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Price"
                        error={!!errors?.price}
                        helperText={errors?.price?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  <Controller
                    defaultValue=""
                    name="manufacturer"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel>Manufacturer</InputLabel>
                        <Select {...field} label="Manufacturer">
                          {manufacturer?.map((e, i) => (
                            <MenuItem key={i} value={e.manufacturerId}>
                              {e.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!errors.manufacturer ? (
                          <Typography color={"error"} fontSize={"12px"}>
                            {errors.manufacturer.message}
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
