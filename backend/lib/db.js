import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to database successfully\nDB host: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to database: ${error}`);
    }
}

export default connectDb;