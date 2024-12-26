import { sequelize } from "../utils/database.js";

import contactSchema from "./schema/contactSchema.js";


export const Contact = sequelize.define("contact", contactSchema);
