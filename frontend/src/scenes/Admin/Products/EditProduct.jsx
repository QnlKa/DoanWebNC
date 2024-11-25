import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header/Header";
import { getBase64 } from "../../../utils/base64.js";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  price: yup.string().required("required"),
  category: yup.string().required("required"),
  brand: yup.string().required("required"),
  quantity: yup.string().required("required"),
});

const EditForm = ({ category, brand, productData, updateProduct }) => {
  const [base64Image, setBase64Image] = useState(productData.images);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const base64 = await getBase64(file);
      setBase64Image(base64);
    } catch (error) {
      console.error(error);
      setBase64Image("");
    }
  };
  return (
    <Box m="20px">
      <Header title="EDIT PRODUCT" subtitle="Edit Product " />
      <Formik
        initialValues={productData}
        validationSchema={checkoutSchema}
        onSubmit={(values) => {
          values.images = base64Image;
          values.quantity = Number(values.quantity);
          values.price = Number(values.price);
          updateProduct(values);
        }}
      >
        <Form style={{ width: "500px" }}>
          <Box display="flex" flexDirection={"column"} m={2} gap={2}>
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              label="ID"
              name="_id"
              disabled
            />
            <Field
              as={TextField}
              fullWidth
              label="Title"
              name="title"
              variant="outlined"
            />
            <Field
              as={TextField}
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
            />
            <Field
              as={TextField}
              fullWidth
              label="Price"
              name="price"
              variant="outlined"
            />
            <Field
              as={TextField}
              fullWidth
              label="Quantity"
              name="quantity"
              variant="outlined"
            />
            <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Field
                as={Select}
                labelId="category-label"
                label="Category"
                name="category"
              >
                {category.map((item) => (
                  <MenuItem key={item._id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
              <InputLabel id="brand-label">Brand</InputLabel>
              <Field
                as={Select}
                labelId="brand-label"
                label="Brand"
                name="brand"
              >
                {brand.map((item) => (
                  <MenuItem key={item._id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <InputLabel id="image-label">Image:</InputLabel>
            <img
              src={base64Image}
              style={{ width: "60px", borderRadius: "50%" }}
              alt=""
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={handleImageUpload}
            >
              Upload file
              <VisuallyHiddenInput
                name="image"
                labelId="image-label"
                type="file"
              />
            </Button>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Update Product
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default EditForm;
