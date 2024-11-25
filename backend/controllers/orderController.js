import Order from "../models/OrderSchema.js";
import Product from "../models/ProductSchema.js";
import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();
import inlineBase64 from "nodemailer-plugin-inline-base64";
export const createOrder = async (req, res) => {
  try {
    const promises = req.body.cart.map(async (order) => {
      const productData = await Product.findOneAndUpdate(
        {
          _id: order.id,
          quantity: { $gte: order.quantity },
        },
        {
          $inc: {
            quantity: -order.quantity,
            sold: +order.quantity,
          },
        },
        { new: true }
      );
      if (productData) {
        return {
          status: "OK",
          message: "SUCCESS",
        };
      } else {
        return {
          status: "OK",
          message: "ERR",
          id: order.product,
        };
      }
    });
    const results = await Promise.all(promises);
    const response = await Order.create(req.body);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ACCOUNT, 
        pass: process.env.MAIL_PASSWORD, 
      },
    });
    transporter.use("compile", inlineBase64({ cidPrefix: "somePrefix_" }));

    let listItem = "";
    const attachImage = [];
    let total = 0;
    req.body.cart.forEach((order) => {
      listItem += `
      <div>
        <div>
          Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.quantity}</b> với giá là: <b>${order.price} VND</b>
        </div>
      </div>`;
      total += order.quantity * order.price;
      attachImage.push({ path: order.image });
    });

    let info = await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT,
      to: req.body.email,
      subject: "Bạn đã đặt hàng tại Văn Phòng Phẩm",
      text: "Hello world?",
      html: `
      <div><b>Bạn đã đặt hàng thành công tại Văn Phòng Phẩm</b></div> 
      ${listItem}
      <div><b>Tổng giá trị đơn hàng: ${total} VND </b></div>`,
      attachments: attachImage,
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      success: true,
      message: "Orders Found",
      data: orders,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Order Found",
    });
  }
};
