// =============================
// Utility helpers
// =============================
function createEmptyBoard(size) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function getBoxShape(size) {
  if (size === 9) return { boxRows: 3, boxCols: 3 };
  if (size === 6) return { boxRows: 2, boxCols: 3 };
  throw new Error("Unsupported board size: " + size);
}

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


// =============================
// 1. Backtracking Solver
// =============================
function isValid(board, row, col, num) {
  const size = board.length;
  const { boxRows, boxCols } = getBoxShape(size);

  // row / column
  for (let i = 0; i < size; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }

  // subgrid
  const boxRowStart = row - (row % boxRows);
  const boxColStart = col - (col % boxCols);

  for (let r = 0; r < boxRows; r++) {
    for (let c = 0; c < boxCols; c++) {
      if (board[boxRowStart + r][boxColStart + c] === num) return false;
    }
  }

  return true;
}

function solveSudoku(board) {
  const size = board.length;

  const findEmpty = () => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] === 0) return [r, c];
      }
    }
    return null;
  };

  const dfs = () => {
    const empty = findEmpty();
    if (!empty) return true;

    const [r, c] = empty;
    const nums = shuffle([...Array(size).keys()].map(v => v + 1));

    for (const num of nums) {
      if (isValid(board, r, c, num)) {
        board[r][c] = num;
        if (dfs()) return true;
        board[r][c] = 0;
      }
    }
    return false;
  };

  dfs();
  return board;
}

function generateFullSolution(size) {
  const board = createEmptyBoard(size);
  solveSudoku(board);
  return board.map(r => r.slice());
}


// =============================
// 2. Unique-solution backtracking checker
// =============================
function hasUniqueSolution(board) {
  const size = board.length;
  let solutions = 0;

  const findEmpty = () => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] === 0) return [r, c];
      }
    }
    return null;
  };

  const dfs = () => {
    if (solutions > 1) return; // early stop
    const empty = findEmpty();
    if (!empty) {
      solutions++;
      return;
    }

    const [r, c] = empty;

    for (let num = 1; num <= size; num++) {
      if (isValid(board, r, c, num)) {
        board[r][c] = num;
        dfs();
        board[r][c] = 0;

        if (solutions > 1) return;
      }
    }
  };

  dfs();
  return solutions === 1;
}


// =============================
// 3. Generate puzzle with unique solution guarantee
// =============================
export function generateSudoku(mode) {
  const size = mode === "easy" ? 6 : 9;

  // Step 1: Generate full solution
  const solution = generateFullSolution(size);

  // Step 2: Start puzzle as a full copy
  const puzzle = solution.map(row => row.slice());
  const fixed = Array.from({ length: size }, () => Array(size).fill(true));

  // Step 3: Random order of cells to remove
  let cells = [];
  for (let i = 0; i < size * size; i++) cells.push(i);
  cells = shuffle(cells);

  // Difficulty
  const removeAttempts = size === 6 ? 18 : 45;

  for (let i = 0; i < removeAttempts; i++) {
    const idx = cells[i];
    const r = Math.floor(idx / size);
    const c = idx % size;

    const backup = puzzle[r][c];
    puzzle[r][c] = 0;
    fixed[r][c] = false;

    const testBoard = puzzle.map(row => row.slice());
    if (!hasUniqueSolution(testBoard)) {
      // revert
      puzzle[r][c] = backup;
      fixed[r][c] = true;
    }
  }

  const errors = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  return {
    size,
    board: puzzle.map(r => r.slice()),
    fixed,
    errors,
    solution,
    initialBoard: puzzle.map(r => r.slice())
  };
}


// =============================
// 4. Conflict checker
// =============================
export function checkConflict(board, r, c, val) {
  if (val === 0) return false;

  const size = board.length;
  const { boxRows, boxCols } = getBoxShape(size);

  for (let col = 0; col < size; col++) {
    if (col !== c && board[r][col] === val) return true;
  }

  for (let row = 0; row < size; row++) {
    if (row !== r && board[row][c] === val) return true;
  }

  const boxRowStart = r - (r % boxRows);
  const boxColStart = c - (c % boxCols);

  for (let rr = 0; rr < boxRows; rr++) {
    for (let cc = 0; cc < boxCols; cc++) {
      const nr = boxRowStart + rr;
      const nc = boxColStart + cc;
      if ((nr !== r || nc !== c) && board[nr][nc] === val) return true;
    }
  }

  return false;
}

// =============================
// 4. Hint finder
// =============================
export function findHintCell(board) {
  const size = board.length;
  const { boxRows, boxCols } = getBoxShape(size);

  const validNums = (r, c) => {
    const candidates = [];

    for (let num = 1; num <= size; num++) {
      if (checkConflict(board, r, c, num) === false) {
        candidates.push(num);
      }
    }

    return candidates;
  };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] !== 0) continue;

      const candidates = validNums(r, c);
      if (candidates.length === 1) {
        return { r, c, val: candidates[0] };
      }
    }
  }

  return null; // no single candidate found
}
