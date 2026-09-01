import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/model.js";
import { secretKey, expireIn } from "../config/config.js";
import { dbIsConnected } from "../utils/database.js";
import { jsonStore } from "../utils/jsonStore.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = null;

    if (!dbIsConnected) {
      const admins = jsonStore.getAll("admin");
      admin = admins.find(a => a.email === email && a.active === true);
    } else {
      admin = await Admin.findOne({ where: { email, active: true } });
    }

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      secretKey || "tech-matrix-secret-2024",
      { expiresIn: expireIn || "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyToken = async (req, res) => {
  res.status(200).json({ message: "Token is valid", admin: req.admin });
};
