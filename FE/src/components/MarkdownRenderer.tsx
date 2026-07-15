import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────
   Inline parser: **bold**, *italic*, `code`, ![img](url), [link](url)
───────────────────────────────────────────────────────────────── */
function parseInline(text: string): ReactNode {
  const re = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g;
  const parts: ReactNode[] = [];
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**"))      parts.push(<strong key={k++}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`"))  parts.push(<code key={k++} className="md-code">{t.slice(1, -1)}</code>);
    else if (t.startsWith("![")) {
      const match = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(t);
      if (match) parts.push(
        <figure key={k++} className="float-right ml-6 mb-4 mt-1 w-[40%] min-w-[280px] max-w-[450px]">
          <img src={match[2]} alt={match[1]} className="rounded-xl w-full object-cover shadow-lg border border-[#ece6d4]" />
          {match[1] && <figcaption className="text-center text-[0.85rem] text-gray-500 mt-2 italic">{match[1]}</figcaption>}
        </figure>
      );
      else parts.push(t);
    }
    else if (t.startsWith("[")) {
      const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(t);
      if (match) parts.push(<a key={k++} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-[#3f6048] underline">{match[1]}</a>);
      else parts.push(t);
    }
    else                          parts.push(<em key={k++}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}

/* ─────────────────────────────────────────────────────────────────
   Block renderer
───────────────────────────────────────────────────────────────── */
export function MarkdownRenderer({ content }: { content: string }): JSX.Element {
  const lines = content.split(/\r?\n/);
  const out: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    /* ── Headings ── */
    if (line.startsWith("#### ")) {
      out.push(<h5 key={i} className="md-h4">{parseInline(line.slice(5))}</h5>);
      i++; continue;
    }
    if (line.startsWith("### ")) {
      out.push(<h4 key={i} className="md-h3">{parseInline(line.slice(4))}</h4>);
      i++; continue;
    }
    if (line.startsWith("## ")) {
      out.push(<h3 key={i} className="md-h2">{parseInline(line.slice(3))}</h3>);
      i++; continue;
    }
    if (line.startsWith("# ")) {
      out.push(<h2 key={i} className="md-h1">{parseInline(line.slice(2))}</h2>);
      i++; continue;
    }

    /* ── Blockquote ── */
    if (line.startsWith(">")) {
      const qs: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) { 
        qs.push(lines[i].replace(/^>\s?/, "")); 
        i++; 
      }
      out.push(
        <blockquote key={`bq-${i}`} className="md-blockquote">
          {qs.map((q, idx) => (
             <div key={idx} style={{ marginBottom: "6px" }}>{parseInline(q)}</div>
          ))}
        </blockquote>
      );
      continue;
    }

    /* ── Horizontal rule ── */
    if (/^[-*_]{3,}$/.test(line.trim())) {
      out.push(<hr key={i} className="md-hr" />);
      i++; continue;
    }

    /* ── Table ── */
    if (line.startsWith("|")) {
      const tls: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) { tls.push(lines[i]); i++; }
      const clean = tls.filter(l => !/^\|[\s\-:|]+\|$/.test(l.trim()));
      const headers = clean[0]?.split("|").slice(1, -1).map(c => c.trim()) ?? [];
      const rows    = clean.slice(1).map(l => l.split("|").slice(1, -1).map(c => c.trim()));
      out.push(
        <div key={`tbl-${i}`} className="md-table-wrap">
          <table className="md-table">
            <thead>
              <tr>{headers.map((h, j) => <th key={j}>{parseInline(h)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j}>{row.map((cell, k) => <td key={k}>{parseInline(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    /* ── Unordered list ── */
    if (/^\s*[-*] /.test(line)) {
      const items: JSX.Element[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) {
        items.push(<li key={i}>{parseInline(lines[i].replace(/^\s*[-*]\s/, ""))}</li>);
        i++;
      }
      out.push(<ul key={`ul-${i}`} className="md-list">{items}</ul>);
      continue;
    }

    /* ── Ordered list ── */
    if (/^\s*\d+\.\s/.test(line)) {
      const items: JSX.Element[] = [];
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        items.push(<li key={i}>{parseInline(lines[i].replace(/^\s*\d+\.\s/, ""))}</li>);
        i++;
      }
      out.push(<ol key={`ol-${i}`} className="md-list md-ol">{items}</ol>);
      continue;
    }

    /* ── Blank line ── */
    if (line.trim() === "") { i++; continue; }

    /* ── Paragraph (collect consecutive lines) ── */
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("|") &&
      !lines[i].startsWith(">") &&
      !/^\s*[-*] /.test(lines[i]) &&
      !/^\s*\d+\.\s/.test(lines[i]) &&
      !/^[-*_]{3,}$/.test(lines[i].trim())
    ) {
      para.push(lines[i]);
      i++;
    }
    if (para.length) {
      out.push(
        <div key={`p-${i}`} className="md-p">
          {para.map((l, j) => (
            <span key={j}>{j > 0 && " "}{parseInline(l)}</span>
          ))}
        </div>
      );
    }
  }

  return <div className="md-content">{out}</div>;
}