import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import { UserModule } from "../src/modules/user/app";
import { ItineraryModule } from "./modules/itinerary/app";
require('dotenv').config()

const app: Express = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.set('PORT', process.env.PORT || 3000);
app.set("BASE_URL", process.env.BASE_URL || "localhost");

const dbConfig = require("../src/database/config/db");

app.use('/api', UserModule, ItineraryModule);


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