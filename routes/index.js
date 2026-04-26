import { Router } from "express";

import authRouter from "./authRoute.js";
import dynamicRouter from "./dynamicRoute.js";
import contactRouter from "./contactRoute.js";

const apiRouter = Router();

const routePath = [
    {
        path: "/contact",
        router: contactRouter,
    },
    {
        path: "/auth",
        router: authRouter,
    },
    {
        path: "/dynamic",
        router: dynamicRouter,
    },
];

routePath.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;

