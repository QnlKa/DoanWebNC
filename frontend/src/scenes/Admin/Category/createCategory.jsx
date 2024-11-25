import { Box, Button, TextField } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header/Header";

const CreateCategory = ({ createCategory }) => {
  const checkoutSchema = yup.object().shape({
    title: yup.string().required("title required"),
  });

  const initialValues = {
    title: "",
  };
  return (
    <Box m={2}>
      <Header title="CREATE CATEGORY" subtitle="Create New Category" />
      <Formik
        onSubmit={createCategory}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {() => (
          <Form style={{ width: "500px" }}>
            <Box display="flex" flexDirection={"column"} m={2} gap={2}>
              <Field
                as={TextField}
                fullWidth
                label="Title"
                name="title"
                variant="outlined"
              />
            </Box>

            <Box display="flex" justifyContent="end" mt={2}>
              <Button type="submit" color="secondary" variant="contained">
                Create Category
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateCategory;
