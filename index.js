import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import slotRoute from "./routes/slotRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useMongoClient: true,
    });
    console.log("connected to Mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("connection disconnected");
});

// middlewares

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/server/auth", authRoute);
app.use("/server/user", userRoute);
app.use("/server/events", eventsRoute);
app.use("/server/slot", slotRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  connect();
  console.log(`listening at ${PORT}`);
});
