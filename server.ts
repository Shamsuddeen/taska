import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./src/routes/task.routes";
import { env } from "process";

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(env.MONGODB_URI || "mongodb://localhost:27017/taska")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(env.PORT || 4000, () => console.log(`Taska server running on port ${env.PORT || 4000}`));
  })
  .catch((err) => console.error("DB connection error:", err));