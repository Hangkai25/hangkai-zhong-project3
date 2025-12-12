import { useState, useEffect, useRef } from "react";
import "./Board.css";

export default function Board({
  size,
  board,
  fixed,
  errors,
  locked,
  hint,
  onInput
}) {
  const [selected, setSelected] = useState({ r: null, c: null });
  const boardRef = useRef(null);

  const { boxRows, boxCols } =
    size === 9 ? { boxRows: 3, boxCols: 3 } : { boxRows: 2, boxCols: 3 };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boardRef.current && !boardRef.current.contains(e.target)) {
        setSelected({ r: null, c: null });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={boardRef}
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 40px)` }}
    >
      {board.map((row, r) =>
        row.map((value, c) => {
          const isFixed = fixed?.[r]?.[c];
          const isError = errors?.[r]?.[c];
          const isSelected = selected.r === r && selected.c === c;
          const isHint = hint && hint.r === r && hint.c === c;

          // alternating subgrid colors
          const subgridRow = Math.floor(r / boxRows);
          const subgridCol = Math.floor(c / boxCols);
          const subgridIndex = (subgridRow + subgridCol) % 2;

          let classNames = "cell";
          classNames += subgridIndex === 0 ? " subgrid-a" : " subgrid-b";

          if (isHint) classNames += " cell-hint";
          if (isSelected) classNames += " cell-selected";
          if (isError) classNames += " cell-error";
          if (isFixed) classNames += " cell-fixed";

          return (
            <input
              key={`${r}-${c}`}
              className={classNames}
              value={value === 0 ? "" : value}
              onClick={() => {
                if (locked) return;
                setSelected({ r, c });
              }}
              onChange={(e) => {
                onInput(r, c, e.target.value);
                setSelected({ r: null, c: null });
              }}
              disabled={isFixed || locked}
              maxLength={1}
            />
          );
        })
      )}
    </div>
  );
}
