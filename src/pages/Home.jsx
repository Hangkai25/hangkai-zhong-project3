import sudokuImage from "../assets/sudoku.png";

export default function Home() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Sudoku</h1>

      <img
        src={sudokuImage}
        alt="Sudoku"
        style={{
          width: "250px",
          maxWidth: "80%",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />

      <p>
        Welcome to the Sudoku game. Use the navigation bar above to choose a mode
        and start playing.
      </p>
    </div>
  );
}
