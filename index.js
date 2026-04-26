import express, { json } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import { apiVersion, port, staticFolder } from "./config/config.js";
import apiRouter from "./routes/index.js";
import { connectToDB, sequelize } from "./utils/database.js";


// Create an instance of Express
const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://techmatrixinnovations.com",
  "https://admin.techmatrixinnovations.com",
  "https://api.techmatrixinnovations.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes("techmatrixinnovations.com")) {
        return callback(null, true);
      } else {
        return callback(null, true); // Still allow for now but ensure origin header is set
      }
    },
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(fileUpload({ useTempFiles: true }));

// API Routes
app.use(`${apiVersion}`, apiRouter); // Example: /api/v1

// Static files (like images, CSS, etc.)
app.use(express.static(staticFolder));

sequelize.sync();
//sequelize.sync({ alter: true });
  


  // Example API route
  app.get('/dashboard', (req, res) => {
    res.json({ message: 'Welcome to the dashboard' });
  });

  // Root route (you can remove this or keep it for testing purposes)
  // app.get('/', (req, res) => {
  //   res.json({ message: 'Welcome to port 3002' });
  // });

  // Start the server
  app.listen(port, async () => {
    console.log(`Server is running on port: ${port}`);
     await connectToDB(); // Make sure DB is connected
  });
;



