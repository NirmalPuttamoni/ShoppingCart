import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import express from "express";
import prouductRoutes from './routes/productRoutes.js';
const port = process.env.PORT || 5000;

connectDb(); // Connecting to MongoDB

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', prouductRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));