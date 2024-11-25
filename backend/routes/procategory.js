import express from "express";
import {
  createProCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/proCategoryController.js";

const router = express.Router();

router.post("/create", createProCategory);
router.get("/all", getAllCategory);
router.delete("/delete/:id", deleteCategory);
export default router;
