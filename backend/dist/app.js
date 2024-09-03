"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app_1 = require("./modules/user/app");
const app_2 = require("./modules/itinerary/app");
const app_3 = require("./modules/key/app");
const axios_1 = __importDefault(require("axios"));
const cron = require('node-cron');
require('dotenv').config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
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
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.set('PORT', process.env.PORT || 3000);
app.set("BASE_URL", process.env.BASE_URL || "localhost");
const dbConfig = require("./database/config/db");
const redis = require("./database/config/redis");
app.use('/api', app_1.UserModule, app_2.ItineraryModule, app_3.KeyModule);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Hello");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}));
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await prisma.$queryRaw`SELECT 1;`;
        console.log("Database connection successful");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with an error code
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield initializeDatabase(); // Ensure the database is connected
        const port = app.get('PORT');
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
});
startServer();
// Added cron
app.get("/ping", (req, res) => {
    res.status(200).json("pong....");
});
const API_ENDPOINT = "https://personalized-itinerary-generator.onrender.com";
const makeApiRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(API_ENDPOINT);
        return response.data;
    }
    catch (err) {
        console.error("API request failed:", err.message);
        throw err;
    }
});
const runApiRequestJob = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running API request job...");
    try {
        const responseData = yield makeApiRequest();
        return responseData;
    }
    catch (error) {
        return null;
    }
});
// Schedule the API request job to run every 15 minutes
cron.schedule("*/2 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = yield runApiRequestJob();
    if (responseData) {
        // Process the response data here
        console.log("API request successful:", responseData);
    }
    else {
        console.log("API request failed");
    }
}));
