import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from './src/routes/auth.js';
import restaurantRouter from './src/routes/restaurant.js'
import cartRouter from './src/routes/cart.js'
import userRouter from  './src/routes/user.js'
import { verifyjwt } from "./src/middleware/verifyJWT.js";

const app = express();

app.use(cors({
	origin: [
	process.env.CORS_ORIGINS, process.env.VERCEL_CORS_ORIGINS
	],
    credentials: true
}))
app.use(bodyParser.json({ limit: "4kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "4kb" }));
app.use(express.static( 'public')); // To store the information that
app.use(cookieParser());


app.use('/', authRouter);
app.use("/cart", verifyjwt, cartRouter);
app.use("/restaurant", verifyjwt, restaurantRouter);
app.use('/profile',verifyjwt,userRouter)

mongoose
	.connect(process.env.ATLASDB_PATH + process.env.DB_NAME)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("Server is running on port:", process.env.PORT);
		});
	})
	.catch((error) => console.log(error));;
