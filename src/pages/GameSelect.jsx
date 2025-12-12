import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function GameSelect() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const loadGames = () => {
    fetch("/api/sudoku")
      .then(res => res.json())
      .then(setGames)
      .catch(console.error);
  };

  useEffect(loadGames, []);

  const createGame = async (difficulty) => {
    const res = await fetch("/api/sudoku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty })
    });

    const data = await res.json();
    loadGames();
    navigate(`/game/${data._id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Game</h1>

      <button onClick={() => createGame("EASY")}>
        Create Easy Game
      </button>

      <button
        onClick={() => createGame("NORMAL")}
        style={{ marginLeft: "10px" }}
      >
        Create Normal Game
      </button>

      <h2 style={{ marginTop: "30px" }}>Existing Games</h2>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {games.map(g => (
          <li key={g._id} style={{ marginBottom: "12px" }}>
            <button
              disabled={g.completed}
              onClick={() => navigate(`/game/${g._id}`)}
              style={{ textAlign: "left", width: "100%" }}
            >
              <strong>{g.name}</strong>
              <br />
              Difficulty: {g.difficulty}
              <br />
              Created by: {g.createdBy || "Anonymous"}
              <br />
              Created at: {formatDate(g.createdAt)}
              {g.completed ? " — Completed" : ""}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
