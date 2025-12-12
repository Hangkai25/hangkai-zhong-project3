import { useEffect, useState } from "react";

export default function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("/api/highscore")
      .then(res => res.json())
      .then(setScores)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>High Scores</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, idx) => (
            <tr key={idx}>
              <td>{s.name}</td>
              <td>{s.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
