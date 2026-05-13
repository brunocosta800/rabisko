// Stepper.jsx — horizontal progress for the booking flow.
// Steps: 0 Artista · 1 Data · 2 Pagamento · 3 Concluído
// Renders nodes + connector lines; completed steps get plum fill + check.

function Stepper({ current = 0, steps }) {
  const labels = steps || ["Artista", "Data", "Pagamento", "Concluído"];
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "10px 4px 14px", gap: 0 }}>
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: "0 0 auto", minWidth: 56 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "grid", placeItems: "center",
                background: done ? "var(--rbk-plum)" : (active ? "var(--rbk-ink)" : "transparent"),
                color: done || active ? "#fff" : "var(--rbk-fg-3)",
                border: done || active ? "0" : "1.5px solid var(--rbk-fg-3)",
                font: "700 12px/1 var(--font-body)",
                transition: "all .25s ease",
              }}>
                {done ? <iconify-icon icon="material-symbols:check-rounded" width="16"></iconify-icon> : (i + 1)}
              </div>
              <div style={{
                font: "600 10px/1 var(--font-body)",
                color: done || active ? "var(--rbk-ink)" : "var(--rbk-fg-3)",
                letterSpacing: ".02em",
                textTransform: "uppercase",
              }}>{label}</div>
            </div>
            {i < labels.length - 1 && (
              <div style={{
                flex: 1, height: 2, marginTop: -16,
                background: done ? "var(--rbk-plum)" : "var(--rbk-fg-3)",
                opacity: done ? 1 : .35,
                transition: "all .25s ease",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Tiny toast helper — call window.__rbkToast("Mensagem enviada")
function Toast({ msg, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [msg, onDone]);
  return (
    <div style={{
      position: "absolute", left: 24, right: 24, bottom: 110,
      background: "var(--rbk-ink)", color: "#fff",
      padding: "12px 16px", borderRadius: "var(--rbk-r-md)",
      font: "600 13px/1.2 var(--font-body)",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,.25)",
      animation: "rbkToastIn .3s ease-out",
      zIndex: 50,
    }}>
      <iconify-icon icon="material-symbols:check-circle-rounded" width="20" style={{ color: "var(--rbk-plum)" }}></iconify-icon>
      <span>{msg}</span>
    </div>
  );
}

// Inject animation keyframes once
if (typeof document !== "undefined" && !document.getElementById("rbk-stepper-kf")) {
  const s = document.createElement("style");
  s.id = "rbk-stepper-kf";
  s.textContent = `
    @keyframes rbkToastIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes rbkPulse  { 0% { transform: scale(.96); opacity: .6; } 50% { transform: scale(1); opacity: 1; } 100% { transform: scale(.96); opacity: .6; } }
  `;
  document.head.appendChild(s);
}

Object.assign(window, { Stepper, Toast });
