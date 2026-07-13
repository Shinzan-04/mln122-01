import { useCallback, useRef, useState } from "react";
import { CheckCircle2, RotateCcw, Search } from "lucide-react";
import {
  WORD_SEARCH_GRID,
  WORD_SEARCH_QUESTIONS,
  GRID_ROWS,
  GRID_COLS,
  cellKey,
  findAnswerForSelection,
  findWordCellsInGrid,
  normalizeAnswer,
  type CellPos,
  type QuestionId,
} from "../data/wordSearchData";

function buildLineCells(start: CellPos, end: CellPos): CellPos[] {
  const dr = Math.sign(end.row - start.row);
  const dc = Math.sign(end.col - start.col);
  const steps = Math.max(Math.abs(end.row - start.row), Math.abs(end.col - start.col));
  const cells: CellPos[] = [];

  for (let i = 0; i <= steps; i++) {
    cells.push({ row: start.row + dr * i, col: start.col + dc * i });
  }

  return cells;
}

export function WordSearchGamePage(): JSX.Element {
  const [activeQuestion, setActiveQuestion] = useState<QuestionId | null>(null);
  const [solved, setSolved] = useState<Partial<Record<QuestionId, string>>>({});
  const [typedAnswers, setTypedAnswers] = useState<Partial<Record<QuestionId, string>>>({});
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [selecting, setSelecting] = useState<CellPos[]>([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"ok" | "err" | "">("");
  const isDragging = useRef(false);
  const anchorRef = useRef<CellPos | null>(null);

  const solvedCount = Object.keys(solved).length;
  const allDone = solvedCount === WORD_SEARCH_QUESTIONS.length;
  const activeQ = WORD_SEARCH_QUESTIONS.find((q) => q.id === activeQuestion) ?? null;

  const markSolved = useCallback((id: QuestionId, answer: string, cells: CellPos[]) => {
    setSolved((prev) => ({ ...prev, [id]: answer }));
    setTypedAnswers((prev) => ({ ...prev, [id]: answer }));
    setFoundCells((prev) => {
      const next = new Set(prev);
      cells.forEach(({ row, col }) => next.add(cellKey(row, col)));
      return next;
    });
  }, []);

  const showFeedback = useCallback((msg: string, type: "ok" | "err") => {
    setFeedback(msg);
    setFeedbackType(type);
  }, []);

  const handleSelectionEnd = useCallback(
    (cells: CellPos[]) => {
      if (cells.length < 2) {
        setSelecting([]);
        return;
      }

      const word = findAnswerForSelection(cells);
      if (!word) {
        showFeedback("Không tìm thấy từ khóa hợp lệ. Thử chọn theo hàng ngang, dọc hoặc chéo.", "err");
        setSelecting([]);
        return;
      }

      const question = WORD_SEARCH_QUESTIONS.find((q) => q.answer === word);
      if (!question) {
        setSelecting([]);
        return;
      }

      if (solved[question.id]) {
        showFeedback(`Bạn đã giải ${question.label} rồi!`, "err");
        setSelecting([]);
        return;
      }

      if (activeQuestion && activeQuestion !== question.id) {
        showFeedback(`Từ "${word}" thuộc ${question.label}, không phải câu đang chọn.`, "err");
        setSelecting([]);
        return;
      }

      markSolved(question.id, word, cells);
      setActiveQuestion(question.id);
      showFeedback(`Chính xác! ${question.label}: ${word}`, "ok");
      setSelecting([]);
    },
    [activeQuestion, markSolved, showFeedback, solved]
  );

  const beginSelect = (cell: CellPos) => {
    isDragging.current = true;
    anchorRef.current = cell;
    setSelecting([cell]);
    setFeedback("");
    setFeedbackType("");
  };

  const extendSelect = (cell: CellPos) => {
    if (!isDragging.current || !anchorRef.current) return;
    setSelecting(buildLineCells(anchorRef.current, cell));
  };

  const endSelect = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    handleSelectionEnd(selecting);
  };

  const handleQuestionClick = (id: QuestionId) => {
    setActiveQuestion(id);
    setFeedback("");
    setFeedbackType("");
  };

  const handleSubmitTyped = () => {
    if (!activeQ) return;

    const typed = normalizeAnswer(typedAnswers[activeQ.id] ?? "");
    if (!typed) {
      showFeedback("Hãy điền đáp án vào ô trống.", "err");
      return;
    }

    if (solved[activeQ.id]) {
      showFeedback(`${activeQ.label} đã được giải.`, "err");
      return;
    }

    if (typed === activeQ.answer) {
      const cells = findWordCellsInGrid(activeQ.answer) ?? [];
      markSolved(activeQ.id, activeQ.answer, cells);
      showFeedback(`Chính xác! ${activeQ.label}: ${activeQ.answer}`, "ok");
      return;
    }

    showFeedback("Đáp án chưa đúng. Hãy tìm từ khóa trong lưới rồi thử lại!", "err");
  };

  const handleReset = () => {
    setActiveQuestion(null);
    setSolved({});
    setTypedAnswers({});
    setFoundCells(new Set());
    setSelecting([]);
    setFeedback("");
    setFeedbackType("");
  };

  const isCellSelected = (row: number, col: number) =>
    selecting.some((c) => c.row === row && c.col === col);

  const isCellFound = (row: number, col: number) =>
    foundCells.has(cellKey(row, col));

  return (
    <section className="ws-wrap fade-in">
      <div className="page-intro">
        <span className="label-chip">
          <Search size={12} /> Săn mật mã
        </span>
        <h2>Phiếu săn mật mã</h2>
        <p className="muted-text">
          Tìm từ khóa trong lưới (ngang, dọc, chéo), chọn câu hỏi bên dưới và điền đáp án.
        </p>
      </div>

      <div className="ws-progress-card surface-block">
        <div className="ws-progress-top">
          <span className="ws-progress-label">Tiến độ</span>
          <span className="ws-progress-count">
            {solvedCount}/{WORD_SEARCH_QUESTIONS.length} câu
          </span>
        </div>
        <div className="ws-progress-bar">
          <div
            className="ws-progress-fill"
            style={{ width: `${(solvedCount / WORD_SEARCH_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="ws-board surface-block">
        <div
          className="ws-grid"
          onMouseLeave={endSelect}
          onMouseUp={endSelect}
          onTouchEnd={endSelect}
        >
          {Array.from({ length: GRID_ROWS }, (_, row) =>
            Array.from({ length: GRID_COLS }, (_, col) => {
              const letter = WORD_SEARCH_GRID[row][col];
              const selected = isCellSelected(row, col);
              const found = isCellFound(row, col);

              return (
                <button
                  key={cellKey(row, col)}
                  type="button"
                  className={[
                    "ws-cell",
                    selected ? "ws-cell--selecting" : "",
                    found ? "ws-cell--found" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    beginSelect({ row, col });
                  }}
                  onMouseEnter={() => extendSelect({ row, col })}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    beginSelect({ row, col });
                  }}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const el = document.elementFromPoint(touch.clientX, touch.clientY);
                    const btn = el?.closest<HTMLButtonElement>(".ws-cell");
                    if (!btn) return;
                    const r = Number(btn.dataset.row);
                    const c = Number(btn.dataset.col);
                    if (!Number.isNaN(r) && !Number.isNaN(c)) extendSelect({ row: r, col: c });
                  }}
                  data-row={row}
                  data-col={col}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
        <p className="ws-grid-hint muted-text">
          Kéo chuột hoặc chạm để chọn các ô tạo thành một từ khóa.
        </p>
      </div>

      <div className="ws-questions">
        <h3 className="ws-questions-title">Chọn câu hỏi</h3>
        <div className="ws-question-buttons">
          {WORD_SEARCH_QUESTIONS.map((q) => {
            const isActive = activeQuestion === q.id;
            const isSolved = Boolean(solved[q.id]);

            return (
              <button
                key={q.id}
                type="button"
                className={[
                  "ws-q-btn",
                  isActive ? "ws-q-btn--active" : "",
                  isSolved ? "ws-q-btn--solved" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleQuestionClick(q.id)}
              >
                {isSolved && <CheckCircle2 size={14} />}
                {q.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeQ && (
        <div className="ws-clue-card surface-block">
          <div className="ws-clue-head">
            <span className="label-chip">{activeQ.label}</span>
            {solved[activeQ.id] && (
              <span className="ws-clue-done">
                <CheckCircle2 size={14} /> Đã giải
              </span>
            )}
          </div>
          <p className="ws-clue-text">{activeQ.text}</p>
          <div className="ws-clue-answer-row">
            <span className="ws-clue-answer-label">=&gt; Đáp án cần điền:</span>
            <input
              type="text"
              className="ws-clue-input"
              placeholder="Điền từ khóa..."
              value={typedAnswers[activeQ.id] ?? ""}
              disabled={Boolean(solved[activeQ.id])}
              onChange={(e) =>
                setTypedAnswers((prev) => ({
                  ...prev,
                  [activeQ.id]: e.target.value.toUpperCase(),
                }))
              }
              onKeyDown={(e) => e.key === "Enter" && handleSubmitTyped()}
            />
            {!solved[activeQ.id] && (
              <button type="button" className="btn btn-primary" onClick={handleSubmitTyped}>
                Kiểm tra
              </button>
            )}
          </div>
        </div>
      )}

      {feedback && (
        <p className={feedbackType === "ok" ? "ws-feedback ws-feedback--ok" : "ws-feedback ws-feedback--err"}>
          {feedback}
        </p>
      )}

      {allDone && (
        <div className="ws-complete surface-block">
          <CheckCircle2 size={32} />
          <h3>Chúc mừng!</h3>
          <p>Bạn đã hoàn thành tất cả 5 câu hỏi săn mật mã.</p>
        </div>
      )}

      <div className="ws-actions">
        <button type="button" className="btn btn-ghost" onClick={handleReset}>
          <RotateCcw size={15} /> Chơi lại
        </button>
      </div>
    </section>
  );
}
