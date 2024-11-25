import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    cart: [],
    totalPrice: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Order", OrderSchema);
