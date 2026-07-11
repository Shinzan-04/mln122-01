export function Loading({ text = "Đang tải..." }: { text?: string }): JSX.Element {
  return (
    <div className="loading-wrap" role="status" aria-live="polite">
      <div className="loading-dots">
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="loading-dot" />
      </div>
      <span className="loading-text">{text}</span>
    </div>
  );
}