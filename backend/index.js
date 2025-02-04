import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';

dotenv.config({});
const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};
app.use(cors(corsOptions));

//api
app.use("api/v1/user", userRoute);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
    });