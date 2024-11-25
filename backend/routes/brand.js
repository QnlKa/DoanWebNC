import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
} from "../controllers/brandController.js";

const router = express.Router();

router.post("/create", createBrand);
router.get("/all", getAllBrand);
router.delete("/delete/:id", deleteBrand);
export default router;
