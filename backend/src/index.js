import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from './routes/auth.js';
import restaurantRouter from './routes/restaurant.js'
import { verifyjwt } from "./middleware/verifyJWT.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true
}))
app.use(bodyParser.json({ limit: "4kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "4kb" }));
app.use(express.static( 'public')); // To store the information that
app.use(cookieParser());


app.use('/', authRouter);
app.use("/restaurant", verifyjwt,restaurantRouter);


mongoose
	.connect(process.env.DB_PATH + process.env.DB_NAME)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("Server is running on port:", process.env.PORT);
		});
	})
	.catch((error) => console.log(error));;
