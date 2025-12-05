import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, shopName, email, password, phone, address } = req.body;
    const vendorExists = await Vendor.findOne({ email });
    if (vendorExists) {
      return res.status(400).json("Email already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({
      name,
      shopName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const savedVendor = await vendor.save();
    return res
      .status(201)
      .json({ message: "Signup successful!", vendor: savedVendor });
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "Vendor does not exists!" });
    }
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
