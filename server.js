import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./backend/db.js";
import Game from "./backend/models/Game.js";
import sudokuAPI from "./backend/api/sudoku.api.js";
import highscoreAPI from "./backend/api/highscore.api.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/sudoku", sudokuAPI);
app.use("/api/highscore", highscoreAPI);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;

connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");

    if (process.env.CLEAR_DB_ON_START === "false") {
      console.log("DEV MODE: Clearing all existing games...");
      await Game.deleteMany({});
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to start server:", err);
  });
