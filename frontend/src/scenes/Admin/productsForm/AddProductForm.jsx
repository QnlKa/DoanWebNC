import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const AddProductForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const productSchema = yup.object().shape({
        productId: yup.string().required("Product ID is required"),
        productName: yup.string().required("Product name is required"),
        category: yup.string().required("Category is required"),
        cost: yup.number().typeError("Cost must be a number").required("Cost is required"),
        description: yup.string(),
    });

    const initialValues = {
        productId:"",
        productName: "",
        category: "",
        cost: "",
        description:"",
    };

    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return (
        <Box m="20px">
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={productSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" m="40px 0 0 0" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{"& > div": { gridColumn: isNonMobile ? undefined : "span 4" }}}>
                        <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Product Id"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.productId}
                                name="productId"
                                error={!!touched.productId && !!errors.productId}
                                helperText={touched.productId && errors.productId}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Pruduct Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.productName}
                                name="productName"
                                error={!!touched.productName && !!errors.productName}
                                helperText={touched.productName && errors.productName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.category}
                                name="category"
                                error={!!touched.category && !!errors.category}
                                helperText={touched.category && errors.category}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cost}
                                name="cost"
                                error={!!touched.cost && !!errors.cost}
                                helperText={touched.cost && errors.cost}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button  type="submit" color="secondary" variant="contained">
                                Add Product
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>   
    );
};

export default AddProductForm;