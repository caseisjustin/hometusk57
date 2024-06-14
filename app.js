import express from 'express';
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { config } from 'dotenv';
config()

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);

app.use(errorHandler);

export default app;
