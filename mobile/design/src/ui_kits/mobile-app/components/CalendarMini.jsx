// CalendarMini.jsx — month grid with one selected (plum) day.

function CalendarMini({ month = "Outubro", year = 2026, selected = 14, onSelect }) {
  // build a 6-row grid starting on Sunday; first day index is arbitrary for this mock
  const startOffset = 3; // a Wednesday for "October 1"
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <div style={{ background: "var(--rbk-surface)", borderRadius: 16, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <iconify-icon icon="ion:chevron-back-outline" width="18" />
        <div style={{ font: "600 14px/1 var(--font-body)" }}>{month} {year}</div>
        <iconify-icon icon="ic:round-chevron-right" width="18" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontSize: 11, color: "var(--rbk-fg-3)", marginBottom: 4 }}>
        {weekdays.map((w, i) => <div key={i} style={{ textAlign: "center" }}>{w}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {cells.map((d, i) => {
          if (d == null) return <div key={i} />;
          const isSel = d === selected;
          return (
            <button key={i} onClick={() => onSelect?.(d)} style={{
              aspectRatio: "1/1", border: 0, cursor: "pointer",
              borderRadius: "50%",
              background: isSel ? "var(--rbk-plum)" : "transparent",
              color: isSel ? "#fff" : "var(--rbk-ink)",
              font: "500 12px/1 var(--font-body)",
            }}>{d}</button>
          );
        })}
      </div>
    </div>
  );
}

window.CalendarMini = CalendarMini;
