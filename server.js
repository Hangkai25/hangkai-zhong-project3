import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./backend/db.js";
import Game from "./backend/models/Game.js";
import sudokuAPI from "./backend/api/sudoku.api.js";
import highscoreAPI from "./backend/api/highscore.api.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/sudoku", sudokuAPI);
app.use("/api/highscore", highscoreAPI);

const PORT = process.env.PORT || 3001;

// ===============================
// MongoDB connect & optional clear
// ===============================
connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");

    // DEV ONLY: clear database on startup
    if (process.env.CLEAR_DB_ON_START === "true") {
      console.log("⚠️ DEV MODE: Clearing all existing games...");
      await Game.deleteMany({});
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Failed to start server:", err);
  });
