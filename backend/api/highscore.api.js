import express from "express";
import Highscore from "../models/Highscore.js";
import Game from "../models/Game.js";

const router = express.Router();

/**
 * GET /api/highscore
 * Returns sorted high score list for games
 * Always returns an ARRAY (never crashes frontend)
 */
router.get("/", async (req, res) => {
  try {
    const scores = await Highscore.find()
      .populate("game")
      .sort({ score: -1, updatedAt: 1 });

    // Filter out broken references (game deleted but highscore remains)
    const result = scores
      .filter(s => s.game)
      .map(s => ({
        gameId: s.game._id,
        name: s.game.name,
        difficulty: s.game.difficulty,
        score: s.score,
        completedAt: s.updatedAt
      }));

    res.json(result);
  } catch (err) {
    console.error("Failed to load highscores:", err);
    // IMPORTANT: frontend expects an array
    res.status(500).json([]);
  }
});

/**
 * GET /api/highscore/:gameId
 * Return high score for a specific game
 */
router.get("/:gameId", async (req, res) => {
  try {
    const score = await Highscore.findOne({ game: req.params.gameId })
      .populate("game");

    if (!score || !score.game) {
      return res.json(null);
    }

    res.json({
      gameId: score.game._id,
      name: score.game.name,
      difficulty: score.game.difficulty,
      score: score.score
    });
  } catch (err) {
    console.error("Failed to get highscore:", err);
    res.status(500).json(null);
  }
});

/**
 * POST /api/highscore
 * Create or update highscore for a completed game
 * (No users -> each completed game gets score = 1)
 */
router.post("/", async (req, res) => {
  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ error: "gameId is required" });
  }

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Create or update highscore
    const score = await Highscore.findOneAndUpdate(
      { game: gameId },
      { score: 1 },
      { new: true, upsert: true }
    );

    // Mark game as completed if not already
    if (!game.completed) {
      game.completed = true;
      await game.save();
    }

    res.json({
      gameId: game._id,
      name: game.name,
      difficulty: game.difficulty,
      score: score.score
    });
  } catch (err) {
    console.error("Failed to update highscore:", err);
    res.status(500).json({ error: "Failed to update highscore" });
  }
});

export default router;
