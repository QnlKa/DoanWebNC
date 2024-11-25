import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header/Header";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getBase64 } from "../../../utils/base64";

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

const AddForm = ({ createUser }) => {
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const [base64Image, setBase64Image] = useState("");

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    role: yup.string().required("Access level is required"),
    address: yup.string().required("required"),
    password: yup.string().required("required"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    role: "",
    image: "",
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
  return (
    <Box m={2}>
      <Header title="CREATE USER" subtitle="Create New User" />
      <Formik
        onSubmit={(values) => {
          values.image = base64Image;
          createUser(values);
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {() => (
          <Form style={{ width: "500px" }}>
            <Box display="flex" flexDirection={"column"} m={2} gap={2}>
              <Field
                as={TextField}
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Password"
                name="password"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Contact Number"
                name="phone"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Address"
                name="address"
                variant="outlined"
              />
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel id="access-label">Role</InputLabel>
                <Field
                  as={Select}
                  labelId="access-label"
                  label="Role"
                  name="role"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
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

            <Box display="flex" justifyContent="end" mt={2}>
              <Button type="submit" color="secondary" variant="contained">
                Create User
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddForm;
