import { config } from "dotenv";
import { Sequelize } from "sequelize";
config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      connectTimeout: 10000, // Increase connection timeout to 10 seconds
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

let dbIsConnected = false;

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    dbIsConnected = true;
    console.log("Successfully connected to Database");
  } catch (err) {
    dbIsConnected = false;
    console.warn("Database connection failed. Falling back to local JSON data store.");
  }
};

export { sequelize, connectToDB, dbIsConnected };
