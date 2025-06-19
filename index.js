import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ===== IMPORTING ROUTES ===== //
import userRoute from "./routes/users.js";
import workOutRoute from "./routes/workOuts.js";

// ===== ROUTE MIDDLEWARES ===== //
app.use("/users", userRoute);
app.use("/workOuts", workOutRoute);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log(`Connected to MongoDB Atlas successfully!`);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();

export { app, mongoose };
