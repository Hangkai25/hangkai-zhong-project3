import Game from "../models/Game.js";
import { generateSudoku } from "../utils/sudoku.js";
import { generateRandomName } from "../utils/randomName.js";

export async function createGame(difficulty) {
  const sudoku = generateSudoku(difficulty);

  const game = new Game({
    name: generateRandomName(),
    difficulty,
    createdBy: "anonymous",
    board: sudoku.board,
    solution: sudoku.solution,
    fixed: sudoku.fixed
  });

  await game.save();
  return game;
}

export async function getAllGames() {
  return Game.find({}, {
    name: 1,
    difficulty: 1,
    createdBy: 1,
    createdAt: 1,
    completed: 1
  }).sort({ createdAt: -1 });
}

export async function getGameById(id) {
  return Game.findById(id);
}

export async function updateGame(id, updates) {
  return Game.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });
}

export async function deleteGame(id) {
  const res = await Game.findByIdAndDelete(id);
  return !!res;
}
