// import config from "./config/index.js";
// import connectDB from "./config/db.js";

// import app from "./app.js";

// connectDB();

// const port = config.port || 4000;

// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });


import config from "./config/index.js";
import connectDB from "./config/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./controllers/errorController.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// Connect to the database
connectDB();
// ROUTES

import userRoutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import oderRoutes from "./routes/orderRoutes.js";
import subscriber from "./routes/subscriberRoutes.js";
import { sendErrorResponse } from "./utils/responseHandler.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// app.use(cors({
//   origin: ['http://localhost:5173','http://localhost:5174',
//      'https://baaazaaradmin.ecommercebaazaar.com/', 
//      'https://ecommercebaazaar.com/'],
//   credentials: true,
// }));


app.use(cors({
  origin: '*',  
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Developing logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API ROUTES
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/products", productRoutes);
app.use("/api/orders", oderRoutes);
app.use("/api/subscribers", subscriber );



app.get("/", (req, res) => {
  res.send("Ships Pharmacy  API is Running");
});

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
