// Field.jsx — pill-shaped input with leading icon + optional trailing icon

function Field({ icon, trailingIcon, onTrailingClick, placeholder, value, onChange, type = "text", label, autoFocus }) {
  return (
    <div style={{ width: "100%" }}>
      {label && <div style={{ font: "var(--t-body-sm)", marginBottom: 6, color: "var(--rbk-ink)" }}>{label}</div>}
      <div style={{
        background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-md)", padding: "16px 22px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        {icon && <iconify-icon icon={icon} width="18" style={{ color: "var(--rbk-ink)", flex: "0 0 auto" }} />}
        <input
          autoFocus={autoFocus}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            flex: 1, background: "transparent", border: 0, outline: 0,
            font: "var(--t-body-lg)", color: "var(--rbk-ink)", minWidth: 0,
          }}
        />
        {trailingIcon && (
          <button onClick={onTrailingClick} style={{ background:"transparent", border:0, padding:0, cursor:"pointer", color:"var(--rbk-ink)" }}>
            <iconify-icon icon={trailingIcon} width="18" />
          </button>
        )}
      </div>
    </div>
  );
}

window.Field = Field;
