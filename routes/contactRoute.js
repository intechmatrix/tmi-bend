import { Router } from "express";
import { contactController } from "../controller/index.js";


const contactRouter = Router();

contactRouter.route("/create").post(contactController.createContact);

contactRouter.route("/viewAll").get( contactController.viewAllContact);

contactRouter.route("/view/:id").get( contactController.viewContact);



contactRouter.route("/delete/:id").delete(contactController.deleteContact);


contactRouter.route("/deleteAll").delete(contactController.deleteAllContact);


export default contactRouter;

