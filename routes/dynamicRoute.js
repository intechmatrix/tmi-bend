import { Router } from "express";
import { dynamicController } from "../controller/index.js";
import { authenticateAdmin } from "../utils/authMiddleware.js";

const dynamicRouter = Router();

// Public routes
dynamicRouter.get("/:type", dynamicController.getAll);
dynamicRouter.get("/:type/:id", dynamicController.getOne);
dynamicRouter.get("/service/slug/:slug", dynamicController.getBySlug);

// Protected routes (Dashboard)
dynamicRouter.post("/:type", authenticateAdmin, dynamicController.create);
dynamicRouter.put("/:type/:id", authenticateAdmin, dynamicController.update);
dynamicRouter.delete("/:type/:id", authenticateAdmin, dynamicController.remove);

export default dynamicRouter;
