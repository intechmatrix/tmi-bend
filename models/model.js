import { sequelize } from "../utils/database.js";

import contactSchema from "./schema/contactSchema.js";
import adminSchema from "./schema/adminSchema.js";
import serviceSchema from "./schema/serviceSchema.js";
import testimonialSchema from "./schema/testimonialSchema.js";
import portfolioSchema from "./schema/portfolioSchema.js";
import teamSchema from "./schema/teamSchema.js";
import clientSchema from "./schema/clientSchema.js";

export const Contact = sequelize.define("contact", contactSchema);
export const Admin = sequelize.define("admin", adminSchema);
export const Service = sequelize.define("service", serviceSchema);
export const Testimonial = sequelize.define("testimonial", testimonialSchema);
export const Portfolio = sequelize.define("portfolio", portfolioSchema);
export const Team = sequelize.define("team", teamSchema);
export const Client = sequelize.define("client", clientSchema);
