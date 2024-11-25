import React, { useState } from 'react';
import {
  Box, Button, FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import Header from "../../../components/Header/Header";
import { getBase64 } from "../../../utils/base64.js";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1
});

const AddForm = ({ brand, category, createProduct }) => {
  const [base64Image, setBase64Image] = useState("");
  // const [videoPreview, setVideoPreview] = useState('');
  const [description, setDescription] = useState('');

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    price: yup.string().required("required"),
    category: yup.string().required("required"),
    brand: yup.string().required("required"),
    quantity: yup.string().required("required"),
  });

  const initialValues = {
    title: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    quantity: 0,
    images: "",
  };

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
  // const handleVideoUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => setVideoPreview(e.target.result);
  //   reader.readAsDataURL(file);
  // };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],     
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],              
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],     
      [{ 'indent': '-1'}, { 'indent': '+1' }],          
      [{ 'direction': 'rtl' }],                        
      [{ 'size': ['small', false, 'large', 'huge'] }],  
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                      
      ['link', 'image', 'video']                   
    ]
  };

  return (
    <Box m={2}>
      <Header title="CREATE PRODUCT" subtitle="Create New Product" />
      <Formik
        onSubmit={(values) => {
          values.images = base64Image;
          values.description = description;
          createProduct(values);
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ setFieldValue }) => (
          <Form style={{ width: "500px" }}>
            <Box display="flex" flexDirection={"column"} m={2} gap={2}>
              <Field
                as={TextField}
                fullWidth
                label="Title"
                name="title"
                variant="outlined"
              />
              <Box>
                <InputLabel>Description</InputLabel>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(value) => {
                    setDescription(value);
                    setFieldValue('description', value);
                  }}
                  modules={modules}
                />
              </Box>
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
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <VisuallyHiddenInput
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
              </Button>
              {/* <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Video
                <VisuallyHiddenInput
                  accept="video/*"
                  id="video-upload"
                  type="file"
                  onChange={handleVideoUpload}
                />
              </Button> */}
            </Box>

            <Box display="flex" justifyContent="end" mt={2}>
              <Button type="submit" color="secondary" variant="contained">
                Create Product
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddForm;
