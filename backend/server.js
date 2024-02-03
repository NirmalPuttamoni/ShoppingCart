import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import express from "express";
import prouductRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;

connectDb(); // Connecting to MongoDB

const app = express();

// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser Middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", prouductRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get('/api/config/paypal', (req,res) => res.send({
  clientId: process.env.PAYPAL_CLIENT_ID
}));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
