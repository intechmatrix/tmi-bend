import express, { json } from 'express';
import cors from "cors";
import bodyParser from "body-parser";

import { apiVersion, port, staticFolder } from "./config/config.js";
import apiRouter from "./routes/index.js";
import { connectToDB, sequelize } from "./utils/database.js";


// Create an instance of Express
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());

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



