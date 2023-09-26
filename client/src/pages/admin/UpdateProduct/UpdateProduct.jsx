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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const defaultTheme = createTheme();

const schema = yup.object().shape({
  manufacturer: yup.string().required("Manufacturer is required"),
  name: yup
    .string()
    .max(100, "string must not be longer than 100 characters")
    .required("Name is required"),
  cpu: yup
    .string()
    .max(45, "string must not be longer than 45 characters")
    .required("CPU is required"),
  gpu: yup
    .string()
    .max(45, "string must not be longer than 45 characters")
    .required("GPU is required"),
  ram: yup.number().min(4, "Min is 4").required("RAM Capacity is required"),
  ramType: yup.string().required("RAM Type is required"),
  ssd: yup.number().min(1, "Min is 1").required("SSD Capacity is required"),
  screenSize: yup
    .number()
    .min(10, "Min is 10")
    .required("Screen Size is required"),
  screenResolution: yup.string().required("Screen Resolution is required"),
  refreshRate: yup
    .number()
    .min(1, "Min is 1")
    .required("Refresh Rate is required"),
  screenType: yup.string().required("Screen Type is required"),
  pin: yup.number().min(1, "Min is 1").required("Pin is required"),
  weight: yup.number().min(0.1, "Min is 0.1").required("Weight is required"),
  quantity: yup
    .number()
    .min(1, "Min is 1")
    .required("Quantity is required")
    .positive()
    .integer(),
  price: yup
    .number()
    .min(1, "Min is 1")
    .required("Price is required")
    .positive(),
});

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [manufacturer, setManufacturer] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrlAvatar, setImageUrlAvatar] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [optionalImages, setOptionalImages] = useState([]);
  // const handleImageChange = (e) => {
  //   setSelectedImage(e.target.files[0]);
  //   setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
  // };

  const handleAvatarUpload = (e) => {
    // if (!selectedImage) return;
    let selectedImage = e.target.files[0];
    let selectedImageUrl = URL.createObjectURL(e.target.files[0]);
    const storageRef = ref(storage, `images/${selectedImage.name}`);
    uploadBytes(storageRef, selectedImage)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        setImageUrlAvatar(url);
        // setSelectedImageUrl(null);
        Swal.fire({
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleMultipleImageUpload = (e) => {
    const files = e.target.files;
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytes(storageRef, file);
      uploadPromises.push(uploadTask);
    }

    Promise.all(uploadPromises)
      .then((snapshots) => {
        const downloadUrls = [];

        snapshots.forEach((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            downloadUrls.push(url);

            // Kiểm tra xem đã tải lên tất cả ảnh chưa và xử lý sau khi tải lên hoàn thành.
            if (downloadUrls.length === files.length) {
              // downloadUrls chứa các đường dẫn tải về của tất cả các ảnh.
              console.log(downloadUrls);
              setOptionalImages(downloadUrls);
              Swal.fire({
                icon: "success",
              });
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!imageUrlAvatar) {
      Swal.fire({
        icon: "error",
        title: "Avatar is not null",
        timer: 2000,
      });
      return;
    } else {
      if (!!imageUrlAvatar) {
        const updateProduct = { ...data, avatar: imageUrlAvatar };
        console.log(updateProduct);
        try {
          let response = await axios.patch(
            `http://localhost:8080/api/v1/laptops/${id}`,
            updateProduct
          );
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Add product successfully",
              timer: 2000,
            });
            navigate("/admin/laptops");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error,
          });
        }
      }
    }
  };
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/laptops/${id}`
    );
    const response2 = await axios.get(
      "http://localhost:8080/api/v1/laptops/manufacturers"
    );
    setManufacturer(response2.data.manufacturers);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
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
            <Box>
              <Typography variant="h4">Avatar</Typography>
              <input type="file" onChange={handleAvatarUpload} />
              {optionalImages && (
                <img src={optionalImages} alt="" width={"350px"} />
              )}

              {/* {imageUrlAvatar ? (
                <img src={imageUrlAvatar} alt="" width={"350px"} />
              ) : (
                <></>
              )} */}
            </Box>
            {/* <Box>
              <Typography variant="h4">Optional Images</Typography>
              <input
                type="file"
                name="optional-image"
                id="optional-image"
                multiple
                onChange={handleMultipleImageUpload}
              />
            </Box> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
