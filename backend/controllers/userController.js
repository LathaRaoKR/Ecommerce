import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"; // ✅ updated

// ----------------- AUTH MIDDLEWARE -----------------
export const authUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, login again" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.userId; // ✅ consistent with createToken
    next();
  } catch (error) {
    console.log("Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ----------------- TOKEN CREATOR -----------------
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

// ----------------- USER LOGIN -----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn’t exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    let token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------- USER REGISTER -----------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    let token = createToken(savedUser._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: savedUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------- ADMIN LOGIN -----------------
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET);
      return res.status(200).json({
        success: true,
        message: "Admin signed in successfully",
        data: {
          token,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
