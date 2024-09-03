import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import { UserModule } from "./modules/user/app";
import { ItineraryModule } from "./modules/itinerary/app";
import { KeyModule } from "./modules/key/app";
import axios from "axios";
const cron = require('node-cron');
require('dotenv').config()

const app: Express = express();
const server = http.createServer(app);
app.use(express.json());
const corsOptions = {
    origin: [
      "*",
      "https://test-it-3725301883.us-central1.run.app",
      "http://localhost:3000",
      "https://personalized-itinerary-generator.vercel.app",
      "https://personalized-itinerary-generator-one.vercel.app/",
      "https://personalized-itinerary-generator-o9doaifew-omkar-gades-projects.vercel.app/"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
app.set('PORT', process.env.PORT || 3000);
app.set("BASE_URL", process.env.BASE_URL || "localhost");

const dbConfig = require("./database/config/db");
const redis = require("./database/config/redis");

app.use('/api', UserModule, ItineraryModule, KeyModule);


app.get('/', async (req: Request, res: Response) => {
    try {
        res.status(200).send("Hello");
    } catch (err: any) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

const initializeDatabase = async () => {
    try {
        // await prisma.$queryRaw`SELECT 1;`;
        console.log("Database connection successful");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with an error code
    }
};

const startServer = async () => {
    try {
        await initializeDatabase(); // Ensure the database is connected
        const port: Number = app.get('PORT');
        server.listen(port, (): void => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();

// Added cron

app.get("/ping", (req, res) => {
    res.status(200).json("pong....");
  });
  
  const API_ENDPOINT = "https://personalized-itinerary-generator.onrender.com";
  
  const makeApiRequest = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      return response.data;
    } catch (err: any) {
      console.error("API request failed:", err.message);
      throw err;
    }
  };
  
  const runApiRequestJob = async () => {
    console.log("Running API request job...");
    try {
      const responseData = await makeApiRequest();
      return responseData;
    } catch (error) {
      return null;
    }
  };
  
  // Schedule the API request job to run every 15 minutes
  cron.schedule("*/2 * * * *", async () => {
    const responseData = await runApiRequestJob();
    if (responseData) {
      // Process the response data here
      console.log("API request successful:", responseData);
    } else {
      console.log("API request failed");
    }
  });