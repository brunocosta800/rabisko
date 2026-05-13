// SessionFlow.jsx — session detail + artist scanner.
// Cliente abre o agendamento → vê "Apresentar QR de check-in" → CheckinScreen (QR).
// Artista abre o agendamento do dia → vê "Ler QR do cliente" → ScannerScreen → confirma.

(function () {
  const { useState, useEffect } = React;
  const { Frame, Button, SmallButton } = window;

  // ─────────────────────────────────────────────── SESSION DETAIL
  function SessionDetailScreen({ go, screen, ctx }) {
    const role = ctx?.role || "cliente";
    const s = ctx?.session || {
      artistName: "João Santos",
      artistPhoto: "../../assets/portrait-artist.png",
      clientName: "Maria Silva",
      clientInitials: "MS",
      date: "Hoje · 14:00",
      duration: "3h",
      style: "Blackwork · antebraço",
      address: "Rua Augusta, 1200 — Pinheiros",
      distance: "320 m",
      price: "R$ 450",
      deposit: "R$ 90 pago",
      status: "confirmada", // confirmada | hoje | concluida
      code: "RBK-4729",
    };
    const isToday = s.date?.toLowerCase().includes("hoje");
    const isClient = role === "cliente";

    return (
      <Frame screen={screen} setScreen={go} hideNav label="09b Sessão">
        {/* HEADER */}
        <div style={{ position: "absolute", inset: "44px 0 auto 0", padding: "12px 20px",
                      display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2, background: "var(--rbk-bg)" }}>
          <button onClick={() => go(isClient ? "calendar" : "dashboard")} aria-label="Voltar"
                  style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--rbk-ink)", padding: 4 }}>
            <iconify-icon icon="ic:round-arrow-back" width="22"></iconify-icon>
          </button>
          <span style={{ font: "700 12px/1 var(--font-body)", letterSpacing: ".1em" }}>SESSÃO</span>
          <button style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--rbk-ink)" }}>
            <iconify-icon icon="material-symbols:more-vert" width="22"></iconify-icon>
          </button>
        </div>

        <div style={{ position: "absolute", inset: "96px 24px 32px 24px", overflow: "auto" }}>
          {/* Date hero */}
          <div style={{ background: "var(--rbk-ink)", color: "var(--rbk-surface)", borderRadius: "var(--rbk-r-xl)", padding: 22, position: "relative", overflow: "hidden" }}>
            <div style={{ font: "var(--t-overline)", letterSpacing: ".1em", opacity: .65 }}>
              {s.status === "concluida" ? "REALIZADA" : isToday ? "É HOJE" : "AGENDADA"}
            </div>
            <div style={{ font: "var(--t-display-xl)", lineHeight: .95, marginTop: 6, letterSpacing: ".02em" }}>
              {s.date.split(" · ")[0].toUpperCase()}
            </div>
            <div style={{ font: "var(--t-display-md)", marginTop: 6 }}>
              {s.date.split(" · ")[1] || ""} · {s.duration}
            </div>
            {/* pulsing dot when hoje */}
            {isToday && (
              <div style={{ position: "absolute", top: 22, right: 22, display: "flex", alignItems: "center", gap: 6, font: "var(--t-caption)", color: "var(--rbk-plum)", background: "rgba(255,255,255,.08)", padding: "5px 10px", borderRadius: "var(--rbk-r-pill)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--rbk-plum)", boxShadow: "0 0 0 0 var(--rbk-plum)", animation: "rbkPulse 1.4s ease-in-out infinite" }} />
                AO VIVO
              </div>
            )}
          </div>

          {/* Counterpart card */}
          <div style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-lg)", padding: 16, marginTop: 14, display: "flex", alignItems: "center", gap: 14 }}>
            {isClient ? (
              <div style={{ width: 56, height: 56, borderRadius: "var(--rbk-r-2xl)", background: `url(${s.artistPhoto}) center/cover` }} />
            ) : (
              <div style={{ width: 56, height: 56, borderRadius: "var(--rbk-r-2xl)", background: "var(--rbk-ink)", color: "#fff", display: "grid", placeItems: "center", font: "600 18px/1 var(--font-body)" }}>
                {s.clientInitials}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{isClient ? "TATUADOR" : "CLIENTE"}</div>
              <div style={{ font: "600 16px/1.2 var(--font-body)", marginTop: 2 }}>{isClient ? s.artistName : s.clientName}</div>
              <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-2)", marginTop: 2 }}>{s.style}</div>
            </div>
            <button onClick={() => go("chat", { artist: { name: isClient ? s.artistName : s.clientName, photo: s.artistPhoto, style: s.style } })}
                    aria-label="Mensagem"
                    style={{ width: 40, height: 40, borderRadius: "var(--rbk-r-xl)", border: 0, cursor: "pointer", background: "var(--rbk-bg)", color: "var(--rbk-ink)", display: "grid", placeItems: "center" }}>
              <iconify-icon icon="majesticons:chat" width="20"></iconify-icon>
            </button>
          </div>

          {/* Info rows */}
          <div style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-lg)", padding: 4, marginTop: 14 }}>
            <InfoRow icon="material-symbols:location-on-rounded" label="Endereço" value={s.address} caption={s.distance ? `${s.distance} de você` : null} />
            <InfoRow icon="solar:card-bold" label={isClient ? "Valor" : "A receber"} value={s.price} caption={s.deposit} divider />
            <InfoRow icon="mdi:identifier" label="Código" value={s.code} divider />
          </div>

          {/* CTA */}
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
            {isClient && isToday && s.status !== "concluida" && (
              <Button full onClick={() => go("checkin", { session: s })}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  <iconify-icon icon="mdi:qrcode" width="18"></iconify-icon>
                  Apresentar QR de check-in
                </span>
              </Button>
            )}
            {!isClient && isToday && s.status !== "concluida" && (
              <Button full onClick={() => go("scanner", { session: s })}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  <iconify-icon icon="mdi:qrcode-scan" width="18"></iconify-icon>
                  Ler QR do cliente
                </span>
              </Button>
            )}
            {!isClient && !isToday && s.status !== "concluida" && (
              <Button full onClick={() => go("chat", { artist: { name: s.clientName, photo: s.artistPhoto, style: s.style } })}>
                Enviar lembrete
              </Button>
            )}
            {isClient && !isToday && s.status !== "concluida" && (
              <SmallButton onClick={() => go("calendar")}>Adicionar ao calendário do telefone</SmallButton>
            )}
            {!isClient && (
              <button onClick={() => go(isClient ? "calendar" : "dashboard")} style={{
                background: "transparent", border: 0, padding: "12px", cursor: "pointer",
                font: "600 13px/1 var(--font-body)", color: "var(--rbk-fg-2)", textAlign: "center",
              }}>Reagendar ou cancelar</button>
            )}
          </div>
        </div>
      </Frame>
    );
  }

  function InfoRow({ icon, label, value, caption, divider }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 14px", borderTop: divider ? "1px solid rgba(0,0,0,.06)" : 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: "var(--rbk-r-lg)", background: "var(--rbk-bg)", display: "grid", placeItems: "center", color: "var(--rbk-ink)" }}>
          <iconify-icon icon={icon} width="18"></iconify-icon>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{label}</div>
          <div style={{ font: "600 14px/1.3 var(--font-body)", marginTop: 2 }}>{value}</div>
          {caption && <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 2 }}>{caption}</div>}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────── ARTIST SCANNER
  function ScannerScreen({ go, screen, ctx }) {
    const s = ctx?.session;
    const [state, setState] = useState("scanning"); // scanning | found

    // Fake scan: auto-trigger after 2s
    useEffect(() => {
      if (state !== "scanning") return;
      const t = setTimeout(() => setState("found"), 1900);
      return () => clearTimeout(t);
    }, [state]);

    return (
      <Frame screen={screen} setScreen={go} hideNav label="11b Scanner">
        <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", color: "#fff", overflow: "hidden" }}>
          {/* fake camera viewfinder */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 50% 40%, #2a2a2a 0%, #0a0a0a 70%)" }} />
          {/* corner brackets */}
          <Brackets state={state} />

          {/* header */}
          <div style={{ position: "absolute", top: 44, left: 0, right: 0, padding: "12px 20px",
                        display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3 }}>
            <button onClick={() => go("session", { session: s, role: "artista" })} aria-label="Voltar"
                    style={{ background: "rgba(255,255,255,.08)", border: 0, color: "#fff", width: 36, height: 36, borderRadius: "var(--rbk-r-lg)", cursor: "pointer" }}>
              <iconify-icon icon="material-symbols:close-rounded" width="20"></iconify-icon>
            </button>
            <span style={{ font: "700 12px/1 var(--font-body)", letterSpacing: ".1em" }}>LER QR DO CLIENTE</span>
            <button style={{ background: "rgba(255,255,255,.08)", border: 0, color: "#fff", width: 36, height: 36, borderRadius: "var(--rbk-r-lg)", cursor: "pointer" }}>
              <iconify-icon icon="material-symbols:bolt-rounded" width="20"></iconify-icon>
            </button>
          </div>

          {/* instructional caption */}
          <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", color: "#fff", zIndex: 3, padding: "0 32px" }}>
            <div style={{ font: "var(--t-overline)", letterSpacing: ".1em", opacity: .6 }}>SESSÃO DE {s?.clientName?.toUpperCase() || "CLIENTE"}</div>
            <div style={{ font: "var(--t-body-sm)", marginTop: 8, opacity: .85 }}>
              {state === "scanning"
                ? "Aponte para o QR exibido no app do cliente"
                : "QR validado · confirme para iniciar a sessão"}
            </div>
          </div>

          {/* result sheet */}
          {state === "found" && (
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "22px 20px 28px",
                          background: "var(--rbk-bg)", color: "var(--rbk-ink)", borderRadius: "22px 22px 0 0", zIndex: 4 }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--rbk-fg-3)", margin: "0 auto 16px", opacity: .35 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "var(--rbk-r-xl)", background: "var(--rbk-plum)", color: "#fff", display: "grid", placeItems: "center" }}>
                  <iconify-icon icon="material-symbols:check-rounded" width="24"></iconify-icon>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>CÓDIGO {s?.code || "RBK-4729"}</div>
                  <div style={{ font: "600 16px/1.2 var(--font-body)", marginTop: 2 }}>{s?.clientName || "Cliente"}</div>
                  <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-2)", marginTop: 2 }}>{s?.date || "Hoje"} · {s?.style || "Sessão"}</div>
                </div>
              </div>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                <Button full onClick={() => go("dashboard")}>Confirmar e iniciar sessão</Button>
                <button onClick={() => setState("scanning")} style={{ background: "transparent", border: 0, padding: 10, font: "600 13px/1 var(--font-body)", color: "var(--rbk-fg-2)", cursor: "pointer" }}>
                  Não é este — ler outro
                </button>
              </div>
            </div>
          )}

          {/* scanning hint */}
          {state === "scanning" && (
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 36, textAlign: "center", color: "#a89c95", font: "var(--t-caption)", letterSpacing: ".08em", zIndex: 3 }}>
              ESCANEANDO…
            </div>
          )}
        </div>
      </Frame>
    );
  }

  function Brackets({ state }) {
    const lit = state === "found" ? "var(--rbk-plum)" : "rgba(255,255,255,.85)";
    const size = 240;
    const arm = 30;
    const stroke = 3;
    return (
      <div style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%)", width: size, height: size, zIndex: 2 }}>
        {/* sweep line */}
        {state === "scanning" && (
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: "rgba(123,81,122,.7)", boxShadow: "0 0 16px var(--rbk-plum)", animation: "rbkSweep 1.6s ease-in-out infinite" }} />
        )}
        {[
          { top: 0, left: 0, br: `${stroke}px 0 0 ${stroke}px solid ${lit}; border-top: ${stroke}px solid ${lit}` },
        ].map((_, i) => null)}
        <Corner pos="tl" lit={lit} arm={arm} stroke={stroke} />
        <Corner pos="tr" lit={lit} arm={arm} stroke={stroke} />
        <Corner pos="bl" lit={lit} arm={arm} stroke={stroke} />
        <Corner pos="br" lit={lit} arm={arm} stroke={stroke} />
      </div>
    );
  }

  function Corner({ pos, lit, arm, stroke }) {
    const base = { position: "absolute", width: arm, height: arm };
    const borders = {
      tl: { top: 0, left: 0, borderTop: `${stroke}px solid ${lit}`, borderLeft: `${stroke}px solid ${lit}`, borderTopLeftRadius: 8 },
      tr: { top: 0, right: 0, borderTop: `${stroke}px solid ${lit}`, borderRight: `${stroke}px solid ${lit}`, borderTopRightRadius: 8 },
      bl: { bottom: 0, left: 0, borderBottom: `${stroke}px solid ${lit}`, borderLeft: `${stroke}px solid ${lit}`, borderBottomLeftRadius: 8 },
      br: { bottom: 0, right: 0, borderBottom: `${stroke}px solid ${lit}`, borderRight: `${stroke}px solid ${lit}`, borderBottomRightRadius: 8 },
    };
    return <div style={{ ...base, ...borders[pos] }} />;
  }

  // sweep + pulse keyframes injection (idempotent)
  if (!document.getElementById("rbk-scanner-css")) {
    const s = document.createElement("style");
    s.id = "rbk-scanner-css";
    s.textContent = `
      @keyframes rbkSweep { 0%, 100% { transform: translateY(-110px); } 50% { transform: translateY(110px); } }
      @keyframes rbkPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(123,81,122,.5); } 50% { box-shadow: 0 0 0 8px rgba(123,81,122,0); } }
    `;
    document.head.appendChild(s);
  }

  Object.assign(window, { SessionDetailScreen, ScannerScreen });
})();
