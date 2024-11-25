import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_key,
    {
      expiresIn: "15d",
    }
  );
};
export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let user;
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.status(200).json({ success: true, message: "Register successfull " });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    if (!(await user.isPasswordMatched(req.body.password))) {
      return res
        .status(400)
        .json({ status: false, message: "Password not match" });
    }
    const token = generateToken(user);
    const { password, role, cart, ...rests } = user._doc;
    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rests },
      role,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};
