import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './lib/db.js';
import todoRoutes from './routes/task.route.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api',todoRoutes);

app.listen(PORT, ()=>{
    console.log(`server started on port: ${PORT} ...`);
    connectDb();
})
