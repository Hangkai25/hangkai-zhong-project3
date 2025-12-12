import express from "express";
import Highscore from "../models/Highscore.js";
import Game from "../models/Game.js";

const router = express.Router();

/**
 * GET /api/highscore
 * Returns sorted high score list for games
 */
router.get("/", async (req, res) => {
  try {
    const scores = await Highscore.find()
      .populate("game")
      .sort({ score: -1, updatedAt: 1 });

    const result = scores.map(s => ({
      gameId: s.game._id,
      name: s.game.name,
      difficulty: s.game.difficulty,
      score: s.score,
      completedAt: s.updatedAt
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load highscores" });
  }
});

/**
 * GET /api/highscore/:gameId
 */
router.get("/:gameId", async (req, res) => {
  try {
    const score = await Highscore.findOne({ game: req.params.gameId })
      .populate("game");

    if (!score) {
      return res.json(null);
    }

    res.json({
      gameId: score.game._id,
      name: score.game.name,
      difficulty: score.game.difficulty,
      score: score.score
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get highscore" });
  }
});

/**
 * POST /api/highscore
 * Create or update highscore for a game
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

    const score = await Highscore.findOneAndUpdate(
      { game: gameId },
      { score: 1 },
      { new: true, upsert: true }
    );

    game.completed = true;
    await game.save();

    res.json({
      gameId: game._id,
      name: game.name,
      difficulty: game.difficulty,
      score: score.score
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update highscore" });
  }
});

export default router;
