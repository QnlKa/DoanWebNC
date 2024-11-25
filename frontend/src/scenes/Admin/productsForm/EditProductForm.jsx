import { Box, Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header/Header";

const EditProductForm = ({ productData, updateProduct}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const productSchema = yup.object().shape({
        productId: yup.string().required("Product ID is required"),
        productName: yup.string().required("Product name is required"),
        category: yup.string().required("Category is required"),
        cost: yup.number().typeError("Cost must be a number").required("Cost is required"),
        description: yup.string(),
    });

    const handleFormSubmit = (values) => {
        console.log(values);
        updateProduct(values);
    }

    return (
        <Box m="20px">
            <Header title="EDIT Product" subtitle="Edit User Profile"/>
            <Formik
                initialValues={productData}
                validationSchema={productSchema}
                onSubmit={handleFormSubmit}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{"& > div": { gridColumn: isNonMobile ? undefined : "span 4" }}}>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.id}
                                name="id"
                                error={!!touched.id && !!errors.id}
                                helperText={touched.id && errors.id}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Full Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Age"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.age}
                                name="age"
                                error={!!touched.age && !!errors.age}
                                helperText={touched.age && errors.age}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                                <InputLabel id="access-label">Access Level</InputLabel>
                                <Select
                                    labelId="access-label"
                                    value={values.access}
                                    label="Access Level"
                                    onChange={e => setFieldValue('access', e.target.value)}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="manager">Manager</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Update User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>   
    );
};

export default EditProductForm;
