import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './lib/db.js';
import todoRoutes from './routes/task.route.js';
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api',todoRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, ()=>{
    console.log(`server started on port: ${PORT} ...`);
    connectDb();
})
