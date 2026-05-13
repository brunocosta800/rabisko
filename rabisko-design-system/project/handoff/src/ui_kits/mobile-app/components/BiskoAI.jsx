// BiskoAI.jsx — Grok-inspired AI studio for tattoo idea generation.
// Dark hero, sparkle accents, prompt suggestions, generated reference grid,
// CTA to body simulator. Replaces the lighter chat list as the main AI surface.

function BiskoAIScreen({ go, screen }) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState(null);

  const SUGGESTIONS = [
    "Cobra minimalista no antebraço",
    "Fineline floral nas costas",
    "Realismo de tigre — punho",
    "Old school — âncora colorida",
  ];

  function generate(q) {
    const next = q || prompt;
    if (!next.trim()) return;
    setPrompt(next);
    setGenerating(true);
    setResults(null);
    setTimeout(() => {
      setGenerating(false);
      setResults([
        { src: "../../assets/tattoo-work-1.png", style: "Realismo", price: "R$ 280" },
        { src: "../../assets/tattoo-work-2.png", style: "Fineline", price: "R$ 180" },
        { src: "../../assets/tattoo-work-1.png", style: "Blackwork", price: "R$ 220" },
        { src: "../../assets/tattoo-work-2.png", style: "Minimalista", price: "R$ 160" },
      ]);
    }, 1400);
  }

  return (
    <Frame screen={screen} setScreen={go} label="07 Bisko AI">
      {/* Dark hero block — Grok-feel */}
      <div style={{
        position: "absolute", inset: "0 0 auto 0", height: 280,
        background: "radial-gradient(120% 100% at 50% 0%, #2a1a25 0%, var(--rbk-ink) 60%, var(--rbk-ink) 100%)",
        color: "#fff", padding: "60px 24px 0",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--rbk-plum), #f0d4c8)",
              display: "grid", placeItems: "center", color: "#fff",
            }}>
              <iconify-icon icon="bi:stars" width="16"></iconify-icon>
            </div>
            <span style={{ font: "700 14px/1 var(--font-body)", letterSpacing: ".08em" }}>BISKO AI</span>
          </div>
          <button onClick={() => go("home")} style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer" }}>
            <iconify-icon icon="material-symbols:close-rounded" width="22"></iconify-icon>
          </button>
        </div>

        <h1 style={{
          font: "var(--t-display-lg)", margin: "30px 0 0", color: "#fff",
          fontSize: 30, letterSpacing: ".01em", lineHeight: 1.1,
        }}>
          Qual ideia <br/><span style={{ color: "#e9b8a3" }}>quer tatuar hoje?</span>
        </h1>
        <p style={{ font: "var(--t-body-sm)", color: "#a89c95", marginTop: 10 }}>
          Descreva sua ideia e a IA traz referências, estilos e artistas compatíveis.
        </p>
      </div>

      {/* Floating prompt input */}
      <div style={{
        position: "absolute", left: 16, right: 16, top: 252,
        background: "var(--rbk-bg)", border: "1px solid rgba(0,0,0,.06)",
        borderRadius: 18, padding: 12, display: "flex", alignItems: "center", gap: 8,
        boxShadow: "0 12px 32px rgba(0,0,0,.18)",
      }}>
        <iconify-icon icon="bi:stars" width="20" style={{ color: "var(--rbk-plum)" }}></iconify-icon>
        <input
          value={prompt} onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="Cobra minimalista, antebraço…"
          style={{
            flex: 1, border: 0, background: "transparent", outline: "none",
            font: "var(--t-body)", color: "var(--rbk-ink)",
          }}
        />
        <button onClick={() => generate()} style={{
          background: "var(--rbk-ink)", color: "#fff", border: 0, borderRadius: 12,
          width: 36, height: 36, display: "grid", placeItems: "center", cursor: "pointer",
        }}>
          <iconify-icon icon="material-symbols:arrow-upward-rounded" width="20"></iconify-icon>
        </button>
      </div>

      {/* Scroll body */}
      <div style={{ position: "absolute", inset: "318px 0 96px", overflow: "auto", padding: "0 24px" }}>
        {!results && !generating && (
          <>
            <div style={{ font: "600 11px/1 var(--font-body)", letterSpacing: ".1em", color: "var(--rbk-fg-3)", textTransform: "uppercase", marginBottom: 12 }}>
              Sugestões
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => generate(s)} style={{
                  background: "var(--rbk-surface)", border: 0, borderRadius: 12,
                  padding: "14px 16px", textAlign: "left", cursor: "pointer",
                  font: "var(--t-body-sm)", color: "var(--rbk-ink)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <iconify-icon icon="ph:sparkle-fill" width="14" style={{ color: "var(--rbk-plum)" }}></iconify-icon>
                  {s}
                </button>
              ))}
            </div>

            <button onClick={() => go("simulator")} style={{
              marginTop: 22, width: "100%", padding: "16px 18px",
              background: "var(--rbk-ink)", color: "#fff", border: 0, borderRadius: 14,
              display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left",
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center" }}>
                <iconify-icon icon="ph:user-focus-bold" width="22"></iconify-icon>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: "700 14px/1 var(--font-body)" }}>Simular no meu corpo</div>
                <div style={{ font: "var(--t-caption)", color: "#a89c95", marginTop: 4 }}>Envie uma foto e veja a tatuagem aplicada</div>
              </div>
              <iconify-icon icon="ic:round-chevron-right" width="22"></iconify-icon>
            </button>
          </>
        )}

        {generating && (
          <div style={{ paddingTop: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, font: "var(--t-body-sm)", color: "var(--rbk-fg-2)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rbk-plum)", animation: "rbkPulse 1s ease infinite" }} />
              Gerando referências para "{prompt}"…
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  aspectRatio: "1/1", borderRadius: 14, background: "var(--rbk-surface)",
                  animation: `rbkShimmer 1.4s ease-in-out ${i * .15}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {results && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ font: "600 11px/1 var(--font-body)", letterSpacing: ".1em", color: "var(--rbk-fg-3)", textTransform: "uppercase" }}>
                4 referências
              </div>
              <button onClick={() => { setResults(null); setPrompt(""); }} style={{ background: "transparent", border: 0, color: "var(--rbk-plum)", font: "700 12px/1 var(--font-body)", cursor: "pointer" }}>Nova busca</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {results.map((r, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", background: "var(--rbk-surface)" }}>
                  <div style={{ aspectRatio: "1/1", background: `url(${r.src}) center/cover` }} />
                  <div style={{ padding: 10 }}>
                    <div style={{ font: "600 12px/1 var(--font-body)" }}>{r.style}</div>
                    <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 4 }}>~{r.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => go("simulator")} style={{
              marginTop: 20, width: "100%", padding: 14, background: "var(--rbk-surface)",
              border: 0, borderRadius: 12, cursor: "pointer",
              font: "700 13px/1 var(--font-body)", color: "var(--rbk-ink)",
            }}>Aplicar no meu corpo →</button>
          </>
        )}
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── BODY SIMULATOR
function SimulatorScreen({ go, screen }) {
  const [step, setStep] = useState("upload"); // upload | preview
  return (
    <Frame screen={screen} setScreen={go} label="07 Simulador">
      <Header onBack={() => go("home")} title="SIMULADOR" />
      <div style={{ position: "absolute", inset: "80px 24px 96px" }}>
        {step === "upload" && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <div style={{
              border: "2px dashed var(--rbk-fg-3)", borderRadius: 18, padding: "40px 24px",
              background: "var(--rbk-surface)",
            }}>
              <iconify-icon icon="ph:camera-plus-bold" width="48" style={{ color: "var(--rbk-ink)" }}></iconify-icon>
              <h2 style={{ font: "var(--t-h2)", margin: "16px 0 6px" }}>Envie uma foto</h2>
              <p style={{ font: "var(--t-body-sm)", color: "var(--rbk-fg-2)" }}>
                Foto da região onde quer tatuar. Quanto mais nítida, melhor a simulação.
              </p>
              <Button full onClick={() => setStep("preview")}>
                <iconify-icon icon="ph:camera-bold" width="18" style={{ marginRight: 8 }}></iconify-icon>
                Tirar Foto
              </Button>
              <button onClick={() => setStep("preview")} style={{ marginTop: 12, background: "transparent", border: 0, font: "700 13px/1 var(--font-body)", cursor: "pointer", color: "var(--rbk-ink)" }}>
                Ou escolher da galeria
              </button>
            </div>
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 16, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
              <iconify-icon icon="boxicons:lock-filled" width="12"></iconify-icon>
              Suas fotos não são compartilhadas
            </div>
          </div>
        )}
        {step === "preview" && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", flex: 1, borderRadius: 18, overflow: "hidden", background: "var(--rbk-surface)" }}>
              <div style={{ position: "absolute", inset: 0, background: "url(../../assets/portrait-artist.png) center/cover" }} />
              {/* simulated tattoo overlay */}
              <img src="../../assets/tattoo-work-1.png" alt="" style={{
                position: "absolute", left: "32%", top: "44%", width: 110, height: 110,
                objectFit: "cover", mixBlendMode: "multiply", opacity: .82,
                borderRadius: 6, transform: "rotate(-6deg)",
              }} />
              <div style={{
                position: "absolute", top: 12, left: 12, right: 12,
                background: "rgba(0,0,0,.55)", color: "#fff", borderRadius: 999,
                padding: "6px 14px", font: "var(--t-caption)", display: "flex", alignItems: "center", gap: 6, width: "fit-content",
              }}>
                <iconify-icon icon="bi:stars" width="12"></iconify-icon>
                Simulação por IA · arraste para reposicionar
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <SmallButton onClick={() => setStep("upload")}><iconify-icon icon="ph:arrow-counter-clockwise-bold" width="14"></iconify-icon> Refazer</SmallButton>
              <SmallButton><iconify-icon icon="ph:resize-bold" width="14"></iconify-icon> Tamanho</SmallButton>
              <SmallButton><iconify-icon icon="ph:palette-bold" width="14"></iconify-icon> Estilo</SmallButton>
            </div>
            <Button full onClick={() => go("home")} style={{ marginTop: 12 }}>Buscar artistas para este desenho</Button>
          </div>
        )}
      </div>
    </Frame>
  );
}

if (typeof document !== "undefined" && !document.getElementById("rbk-shimmer-kf")) {
  const s = document.createElement("style");
  s.id = "rbk-shimmer-kf";
  s.textContent = `@keyframes rbkShimmer { 0%, 100% { opacity: .6; } 50% { opacity: 1; } }`;
  document.head.appendChild(s);
}

Object.assign(window, { BiskoAIScreen, SimulatorScreen });
