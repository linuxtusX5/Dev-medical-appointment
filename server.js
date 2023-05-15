import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));


//routes
app.use('/api/v1/user', userRoutes)

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Port
const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Server Running in ${process.env.DEV_MODE} Mode on Port ${process.env.PORT}`)
})