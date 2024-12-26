import { Router } from "express";

import contactRouter from "./contactRoute.js";


const apiRouter = Router();

const routePath = [
    {
        path: "/contact",
        router: contactRouter,
    },

];

routePath.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;

