import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProduct,
  getSoldProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/singleProduct/:id", getSingleProduct);
router.get("/all", getAllProduct);
router.get("/soldproduct", getSoldProduct);
export default router;
