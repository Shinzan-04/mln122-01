import type { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  value: string;
  note?: string;
  icon?: ReactNode;
}

export function StatusCard({ title, value, note, icon }: StatusCardProps): JSX.Element {
  return (
    <article className="status-card">
      {icon && <div className="stat-icon-wrap">{icon}</div>}
      <strong className="stat-value">{value}</strong>
      <p className="stat-label">{title}</p>
      {note && <span className="stat-note">{note}</span>}
    </article>
  );
}