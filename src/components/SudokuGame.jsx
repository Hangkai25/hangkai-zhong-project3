import Board from "./Board";
import { checkConflict, findHintCell } from "../utils/sudoku";
import { useState } from "react";

export default function SudokuGame({
  board,
  fixed,
  solution,
  completed,
  onBoardChange,
  onComplete
}) {
  const [errors, setErrors] = useState(
    board.map(row => row.map(() => false))
  );
  const [hint, setHint] = useState(null);

  const checkSolved = (b) => {
    for (let r = 0; r < solution.length; r++) {
      for (let c = 0; c < solution.length; c++) {
        if (b[r][c] !== solution[r][c]) return false;
      }
    }
    return true;
  };

  const handleInput = (r, c, val) => {
    if (completed || fixed[r][c]) return;

    const size = board.length;
    const regex = size === 6 ? /^[1-6]?$/ : /^[1-9]?$/;
    if (!regex.test(val)) return;

    const newBoard = board.map(row => row.slice());
    newBoard[r][c] = val === "" ? 0 : Number(val);

    const newErrors = errors.map(row => row.slice());
    newErrors[r][c] = checkConflict(newBoard, r, c, newBoard[r][c]);

    setErrors(newErrors);
    setHint(null);
    onBoardChange(newBoard);

    if (checkSolved(newBoard)) {
      onComplete();
      alert("Congratulations! You solved the puzzle.");
    }
  };

  const handleHint = () => {
    const h = findHintCell(board);
    if (!h) {
      alert("No single-candidate cell available.");
      return;
    }
    setHint(h);
  };

  return (
    <div>
      <Board
        size={board.length}
        board={board}
        fixed={fixed}
        errors={errors}
        locked={completed}
        hint={hint}
        onInput={handleInput}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleHint} disabled={completed}>
          Hint
        </button>
      </div>
    </div>
  );
}
