import express from "express";
import { createOrder, getAllOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/all", getAllOrder);
export default router;
