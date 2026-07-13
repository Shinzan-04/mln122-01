export const GRID_ROWS = 12;
export const GRID_COLS = 12;

/** Lưới chữ đúng theo phiếu "Săn mật mã" */
export const WORD_SEARCH_GRID: string[][] = [
  ["T", "O", "N", "G", "D", "A", "N", "X", "C", "A", "B", "G"],
  ["H", "H", "O", "I", "N", "H", "U", "A", "N", "F", "D", "K"],
  ["U", "A", "U", "H", "O", "A", "T", "R", "I", "T", "U", "H"],
  ["O", "N", "H", "A", "N", "U", "O", "C", "A", "H", "M", "A"],
  ["N", "I", "A", "N", "L", "U", "O", "C", "M", "H", "Y", "N"],
  ["G", "H", "P", "H", "O", "K", "H", "A", "N", "H", "A", "O"],
  ["L", "O", "I", "N", "H", "U", "A", "N", "F", "D", "I", "N"],
  ["A", "A", "P", "H", "E", "K", "H", "A", "N", "H", "F", "G"],
  ["I", "H", "A", "I", "H", "O", "A", "M", "N", "P", "O", "D"],
  ["N", "O", "N", "G", "D", "A", "N", "S", "D", "F", "G", "A"],
  ["L", "O", "I", "N", "H", "U", "A", "N", "A", "B", "C", "N"],
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
];

export const KEYWORDS = [
  "LOINHUAN",
  "HAIHOA",
  "THUONGLAI",
  "NHANUOC",
  "NONGDAN",
  "CAPHEKHANH",
] as const;

export type QuestionId = "A" | "B" | "C" | "D" | "E";

export interface WordSearchQuestion {
  id: QuestionId;
  label: string;
  text: string;
  answer: string;
}

export const WORD_SEARCH_QUESTIONS: WordSearchQuestion[] = [
  {
    id: "A",
    label: "Câu A",
    text: "Người trung gian thu mua cà phê nhân tại rẫy của anh Khánh với giá 40.000đ/kg rồi bán lại cho các nhà máy, chuỗi lớn.",
    answer: "THUONGLAI",
  },
  {
    id: "B",
    label: "Câu B",
    text: "Đối tượng trực tiếp đổ mồ hôi gánh chịu rủi ro lớn nhất về giá cả, thiên tai nhưng lại nhận phần lợi ích nhỏ nhất trong chuỗi giá trị.",
    answer: "NONGDAN",
  },
  {
    id: "C",
    label: "Câu C",
    text: "Động lực kinh tế mạnh mẽ nhất và cũng là mục tiêu cốt lõi của các tập đoàn, chuỗi bán lẻ lớn như Highland Coffee khi tham gia thị trường.",
    answer: "LOINHUAN",
  },
  {
    id: "D",
    label: "Câu D",
    text: "Chủ thể đứng ở trung tâm, sử dụng luật pháp và các chính sách phân phối thu nhập để điều tiết và tháo gỡ các mâu thuẫn kinh tế phát sinh.",
    answer: "NHANUOC",
  },
  {
    id: "E",
    label: "Câu E",
    text: "Mục tiêu tối cao mà Nhà nước Việt Nam hướng tới khi điều hòa các lợi ích cá nhân, doanh nghiệp và toàn xã hội trong nền kinh tế thị trường định hướng XHCN.",
    answer: "HAIHOA",
  },
];

export type CellPos = { row: number; col: number };

export function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

export function cellsToWord(cells: CellPos[]): string {
  return cells.map(({ row, col }) => WORD_SEARCH_GRID[row][col]).join("");
}

export function normalizeAnswer(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function isStraightLine(cells: CellPos[]): boolean {
  if (cells.length < 2) return true;

  const sorted = [...cells].sort((x, y) =>
    x.row === y.row ? x.col - y.col : x.row - y.row
  );
  const dr = sorted[1].row - sorted[0].row;
  const dc = sorted[1].col - sorted[0].col;

  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return false;

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    if (curr.row - prev.row !== dr || curr.col - prev.col !== dc) return false;
  }

  return true;
}

export function findAnswerForSelection(cells: CellPos[]): string | null {
  if (!isStraightLine(cells) || cells.length < 2) return null;

  const forward = normalizeAnswer(cellsToWord(cells));
  const backward = normalizeAnswer(cellsToWord([...cells].reverse()));
  const validAnswers = new Set(WORD_SEARCH_QUESTIONS.map((q) => q.answer));

  if (validAnswers.has(forward)) return forward;
  if (validAnswers.has(backward)) return backward;
  return null;
}

const SEARCH_DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
];

/** Tìm vị trí ô của một từ khóa trên lưới (ngang / dọc / chéo). */
export function findWordCellsInGrid(word: string): CellPos[] | null {
  const target = normalizeAnswer(word);

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      for (const [dr, dc] of SEARCH_DIRECTIONS) {
        const cells: CellPos[] = [];
        let fits = true;

        for (let i = 0; i < target.length; i++) {
          const nr = row + dr * i;
          const nc = col + dc * i;
          if (nr < 0 || nr >= GRID_ROWS || nc < 0 || nc >= GRID_COLS) {
            fits = false;
            break;
          }
          cells.push({ row: nr, col: nc });
        }

        if (!fits) continue;
        if (normalizeAnswer(cellsToWord(cells)) === target) return cells;
      }
    }
  }

  return null;
}
