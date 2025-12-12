export default function Rules() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sudoku Rules</h1>

      <ul style={{ lineHeight: "28px" }}>
        <li>Each row must contain all numbers exactly once.</li>
        <li>Each column must contain all numbers exactly once.</li>
        <li>Each sub-grid must also contain all numbers exactly once.</li>
        <li>Easy Mode uses a 6×6 board; Normal Mode uses a 9×9 board.</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>Credits</h2>
      <p style={{ lineHeight: "26px" }}>
        Made by Hangkai Zhong<br />

        Email:{" "}
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          zhonghangkai@gg.com
        </a>
        <br />

        GitHub:{" "}
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Github Link
        </a>
        <br />

        LinkedIn:{" "}
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          LinkedIn Link
        </a>
      </p>
    </div>
  );
}
