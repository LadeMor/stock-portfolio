import cors from "cors";
import express from "express";
import { prisma } from "./prisma/client.js";
import 'dotenv/config'

import authRoutes from "./routes/auth.route.js";
import stockRoutes from "./routes/stock.route.js";
import apiRoutes from "./routes/api.route.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/finnhub", apiRoutes);

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});