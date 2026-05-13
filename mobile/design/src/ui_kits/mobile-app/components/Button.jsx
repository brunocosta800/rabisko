// Button.jsx — primary pill (ink), secondary (cream), small variants.

function Button({ children, variant = "primary", full, onClick, style, icon }) {
  const base = {
    border: 0, cursor: "pointer", borderRadius: "var(--rbk-r-md)", display: "inline-flex",
    alignItems: "center", justifyContent: "center", gap: 10, padding: "18px 40px",
    font: "var(--t-button)", transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
    width: full ? "100%" : undefined, boxSizing: "border-box",
  };
  const variants = {
    primary:   { background: "var(--rbk-ink)",      color: "var(--rbk-on-ink)" },
    secondary: { background: "var(--rbk-surface)",  color: "var(--rbk-ink)" },
    cream:     { background: "var(--rbk-bg)",       color: "var(--rbk-ink)" },
    plum:      { background: "var(--rbk-plum)",     color: "#fff" },
    ghost:     { background: "transparent",         color: "var(--rbk-ink)" },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icon && <iconify-icon icon={icon} width="18" />}
      {children}
    </button>
  );
}

function SmallButton({ children, variant = "primary", icon, onClick, style }) {
  const variants = {
    primary: { background: "var(--rbk-ink)",    color: "#fff" },
    plum:    { background: "var(--rbk-plum)",   color: "#fff" },
    cream:   { background: "var(--rbk-surface)", color: "var(--rbk-ink)" },
  };
  return (
    <button onClick={onClick} style={{
      border: 0, cursor: "pointer", padding: "8px 18px", borderRadius: "var(--rbk-r-md)",
      font: "500 12px/1 var(--font-body)", display: "inline-flex", alignItems: "center", gap: 6,
      ...variants[variant], ...style,
    }}>
      {icon && <iconify-icon icon={icon} width="14" />}
      {children}
    </button>
  );
}

window.Button = Button;
window.SmallButton = SmallButton;
