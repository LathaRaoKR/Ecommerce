import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // ✅ Correct way to extract Bearer token
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, login again" });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract token

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Match admin credentials stored in token
    const adminCheck =
      token_decode.email === process.env.ADMIN_EMAIL &&
      token_decode.password === process.env.ADMIN_PASSWORD;

    if (!adminCheck) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Not admin." });
    }

    next();
  } catch (error) {
    console.log("Admin Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
