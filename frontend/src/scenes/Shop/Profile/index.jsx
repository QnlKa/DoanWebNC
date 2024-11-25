import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header/Header";

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
// const userSchema = yup.object().shape({
//   name: yup.string().required("Full name is required"),
//   address: yup.string(),
//   phone: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("Phone number is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   role: yup.string().required("Access level is required"),
// });

const Profile = ({ userData, updateUser }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header subtitle="Thông tin người dùng" />
      <Formik
        initialValues={userData}
        // validationSchema={userSchema}
        onSubmit={updateUser}
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
              variant="filled"
              label="Full Name"
              name="name"
            />
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              label="Phone Number"
              name="phone"
            />
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              label="Address"
              name="address"
            />
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              label="Email"
              name="email"
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Cập nhật
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default Profile;
