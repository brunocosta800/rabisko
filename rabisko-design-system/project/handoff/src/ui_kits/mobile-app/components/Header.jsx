// Header.jsx — back chevron + Bebas Neue title

function Header({ title, onBack, right }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 32, height: 38, display: "flex", alignItems: "center", paddingInline: 32 }}>
      {onBack && (
        <button onClick={onBack} style={{ background:"transparent", border:0, padding:0, cursor:"pointer", display:"grid", placeItems:"center", width: 32, height: 32, color:"var(--rbk-ink)" }} aria-label="Voltar">
          <iconify-icon icon="ion:chevron-back-outline" width="28" />
        </button>
      )}
      <div style={{ flex: 1, textAlign: "center", font: "var(--t-display-lg)", letterSpacing: ".015em" }}>{title}</div>
      <div style={{ width: 32, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

window.Header = Header;
