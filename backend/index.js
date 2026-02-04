import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/auth',authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on ${PORT}`);
});