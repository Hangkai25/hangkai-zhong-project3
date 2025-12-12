import express from "express";
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
} from "../store/sudokuStore.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getAllGames());
});

router.post("/", async (req, res) => {
  const { difficulty } = req.body;

  if (!["EASY", "NORMAL"].includes(difficulty)) {
    return res.status(400).json({ error: "Invalid difficulty" });
  }

  const game = await createGame(difficulty);
  res.json(game);
});

router.get("/:id", async (req, res) => {
  const game = await getGameById(req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json(game);
});

router.put("/:id", async (req, res) => {
  const updated = await updateGame(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Game not found" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const ok = await deleteGame(req.params.id);
  if (!ok) return res.status(404).json({ error: "Game not found" });
  res.json({ success: true });
});

export default router;
