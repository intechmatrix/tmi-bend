import { Router } from "express";
import { authController } from "../controller/index.js";
import { authenticateAdmin } from "../utils/authMiddleware.js";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.get("/verify", authenticateAdmin, authController.verifyToken);

export default authRouter;
