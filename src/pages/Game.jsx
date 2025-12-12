import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SudokuGame from "../components/SudokuGame";

export default function Game() {
  
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    fetch(`/api/sudoku/${gameId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load game");
        return res.json();
      })
      .then(setGame)
      .catch(console.error);
  }, [gameId]);

  const updateBoard = async (newBoard) => {
    const res = await fetch(`/api/sudoku/${gameId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board: newBoard })
    });
    const updated = await res.json();
    setGame(updated);
  };

  const markCompleted = async () => {
    const res = await fetch(`/api/sudoku/${gameId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });
    const updated = await res.json();
    setGame(updated);
  };

  if (!game) return <p>Loading game...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{game.name}</h2>
      <p>Difficulty: {game.difficulty}</p>

      {game.completed && (
        <p style={{ color: "green" }}>Completed</p>
      )}

      <SudokuGame
        board={game.board}
        fixed={game.fixed}
        solution={game.solution}
        completed={game.completed}
        onBoardChange={updateBoard}
        onComplete={markCompleted}
      />
    </div>
  );
}
