// Chip.jsx — three chip variants used across the app

function FilterChip({ icon, children, onClick, active }) {
  return (
    <button onClick={onClick} style={{
      background: active ? "var(--rbk-ink)" : "var(--rbk-surface)",
      color: active ? "#fff" : "var(--rbk-ink)",
      border: 0, borderRadius: "var(--rbk-r-pill)", padding: "8px 16px",
      display: "inline-flex", alignItems: "center", gap: 8,
      font: "var(--t-body)", cursor: "pointer",
    }}>
      {icon && <iconify-icon icon={icon} width="14" />}
      {children}
    </button>
  );
}

function PrefChip({ children, onClick, selected }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? "var(--rbk-plum)" : "var(--rbk-ink)",
      color: "#fff", border: 0, borderRadius: "var(--rbk-r-pill)", padding: "10px 18px",
      font: "700 13px/1 var(--font-body)", letterSpacing: ".03em", textTransform: "uppercase",
      cursor: "pointer",
    }}>
      {children}
    </button>
  );
}

function StatusPill({ children, tone = "ink" }) {
  const tones = {
    ink:  { background: "var(--rbk-surface)", color: "var(--rbk-ink)", border: "1px solid var(--rbk-ink)" },
    plum: { background: "var(--rbk-plum)",    color: "#fff", border: 0 },
  };
  return (
    <span style={{
      borderRadius: "var(--rbk-r-pill)", padding: "6px 14px",
      font: "700 12px/1 var(--font-body)", display: "inline-block",
      ...tones[tone],
    }}>{children}</span>
  );
}

window.FilterChip = FilterChip;
window.PrefChip = PrefChip;
window.StatusPill = StatusPill;
