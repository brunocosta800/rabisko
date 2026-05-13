// MoreScreens.jsx — additional screens identified from the TCC sitemap:
// PostTattoo (healing timeline), Checkin (QR), Rating, ArtistDashboard, ArtistSignup.

// ─────────────────────────────────────────────── POST-TATTOO HEALING
function PostTattooScreen({ go, screen }) {
  const entries = [
    { day: 1,  label: "Dia 1",  status: "Fresca", photo: "../../assets/tattoo-work-1.png", note: "Aplicado filme protetor. Manter por 24h.", from: "artist" },
    { day: 3,  label: "Dia 3",  status: "Descamando", photo: "../../assets/tattoo-work-2.png", note: "Iniciou descamação leve. Normal.", from: "client" },
    { day: 7,  label: "Dia 7",  status: "Cicatrizando", photo: null, note: "Como está a coceira? Pode hidratar 3× ao dia.", from: "artist" },
    { day: 14, label: "Dia 14", status: "—", photo: null, note: "Próximo registro em 5 dias", from: "system" },
  ];
  return (
    <Frame screen={screen} setScreen={go} label="10 Pós-Tatuagem">
      <Header onBack={() => go("calendar")} title="PÓS-TATUAGEM" />
      <div style={{ position: "absolute", inset: "80px 24px 96px", overflow: "auto" }}>
        <div style={{
          background: "var(--rbk-ink)", color: "#fff", borderRadius: "var(--rbk-r-lg)", padding: 16,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--rbk-r-xl)", background: "url(../../assets/portrait-artist.png) center/cover" }} />
          <div style={{ flex: 1 }}>
            <div style={{ font: "700 14px/1.1 var(--font-body)" }}>João Santos · Cicatrização</div>
            <div style={{ font: "var(--t-caption)", color: "#a89c95", marginTop: 4 }}>Iniciado em 14 Out · Dia 7 de 30</div>
          </div>
          <button style={{ background: "rgba(255,255,255,.1)", border: 0, color: "#fff", borderRadius: "var(--rbk-r-sm)", padding: "8px 12px", cursor: "pointer", font: "600 11px/1 var(--font-body)" }}>Chat</button>
        </div>

        {/* progress bar */}
        <div style={{ marginTop: 14, height: 6, borderRadius: 3, background: "var(--rbk-surface)", overflow: "hidden" }}>
          <div style={{ width: "23%", height: "100%", background: "var(--rbk-plum)" }} />
        </div>

        <div style={{ font: "600 11px/1 var(--font-body)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--rbk-fg-3)", margin: "22px 0 14px" }}>
          Linha do tempo
        </div>

        <div style={{ position: "relative", paddingLeft: 22 }}>
          {/* vertical line */}
          <div style={{ position: "absolute", left: 9, top: 6, bottom: 6, width: 2, background: "var(--rbk-surface)" }} />
          {entries.map((e, i) => (
            <div key={e.day} style={{ position: "relative", marginBottom: 16 }}>
              <div style={{
                position: "absolute", left: -22, top: 4, width: 20, height: 20, borderRadius: "var(--rbk-r-sm)",
                background: e.from === "system" ? "var(--rbk-bg)" : "var(--rbk-plum)",
                border: e.from === "system" ? "2px solid var(--rbk-fg-3)" : "0",
                display: "grid", placeItems: "center", color: "#fff",
              }}>
                {e.from !== "system" && <iconify-icon icon="material-symbols:check-rounded" width="12"></iconify-icon>}
              </div>
              <div style={{
                background: e.from === "system" ? "transparent" : "var(--rbk-surface)",
                border: e.from === "system" ? "1px dashed var(--rbk-fg-3)" : "0",
                borderRadius: "var(--rbk-r-md)", padding: 12,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ font: "700 12px/1 var(--font-body)" }}>{e.label}</span>
                  <span style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{e.status}</span>
                </div>
                <div style={{ font: "var(--t-body-sm)", color: "var(--rbk-ink)" }}>{e.note}</div>
                {e.photo && (
                  <div style={{ marginTop: 8, height: 100, borderRadius: "var(--rbk-r-xs)", background: `url(${e.photo}) center/cover` }} />
                )}
              </div>
            </div>
          ))}
        </div>

        <button style={{
          width: "100%", padding: 14, marginTop: 8,
          background: "var(--rbk-ink)", color: "#fff", border: 0, borderRadius: "var(--rbk-r-md)",
          font: "700 14px/1 var(--font-body)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <iconify-icon icon="ph:camera-plus-bold" width="18"></iconify-icon>
          Adicionar registro de hoje
        </button>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── CHECK-IN QR
function CheckinScreen({ go, screen }) {
  return (
    <Frame screen={screen} setScreen={go} hideNav label="11 Check-in">
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, var(--rbk-ink) 0%, var(--rbk-ink) 60%, var(--rbk-bg) 60%, var(--rbk-bg) 100%)",
        display: "flex", flexDirection: "column", padding: "60px 24px 32px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
          <button onClick={() => go("calendar")} style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer" }}>
            <iconify-icon icon="material-symbols:close-rounded" width="22"></iconify-icon>
          </button>
          <span style={{ font: "700 12px/1 var(--font-body)", letterSpacing: ".1em" }}>CHECK-IN DA SESSÃO</span>
          <div style={{ width: 22 }} />
        </div>

        <div style={{ color: "#fff", textAlign: "center", marginTop: 24 }}>
          <div style={{ font: "var(--t-caption)", color: "#a89c95" }}>Hoje · 14:00</div>
          <h1 style={{ font: "var(--t-display-md)", margin: "8px 0 0", color: "#fff", letterSpacing: ".02em" }}>JOÃO SANTOS</h1>
          <div style={{ font: "var(--t-body-sm)", color: "#a89c95", marginTop: 4 }}>Rua Augusta, 1200 · 320m</div>
        </div>

        {/* QR card */}
        <div style={{
          background: "#fff", borderRadius: "var(--rbk-r-xl)", padding: 28, margin: "32px 0",
          boxShadow: "0 24px 60px rgba(0,0,0,.4)",
        }}>
          <FakeQR />
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", letterSpacing: ".15em" }}>CÓDIGO DA RESERVA</div>
            <div style={{ font: "700 24px/1 var(--font-body)", letterSpacing: ".2em", marginTop: 6 }}>RBK-4729</div>
          </div>
        </div>

        <div style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-md)", padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <iconify-icon icon="material-symbols:info-rounded" width="20" style={{ color: "var(--rbk-plum)" }}></iconify-icon>
          <div style={{ font: "var(--t-body-sm)", flex: 1 }}>
            Mostre este QR ao tatuador na chegada para validar a sessão.
          </div>
        </div>
      </div>
    </Frame>
  );
}

function FakeQR() {
  // Deterministic pseudo-QR with finder squares in 3 corners.
  const N = 25;
  function isFinder(r, c) {
    const inBox = (rr, cc) => rr >= 0 && rr < 7 && cc >= 0 && cc < 7;
    const ring = (rr, cc) => (rr === 0 || rr === 6 || cc === 0 || cc === 6) || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
    const corners = [[0,0],[0,N-7],[N-7,0]];
    for (const [or, oc] of corners) {
      if (inBox(r-or, c-oc)) return ring(r-or, c-oc);
    }
    return null;
  }
  const cells = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const f = isFinder(r, c);
      if (f !== null) { cells.push(f); continue; }
      // pseudo-random but deterministic
      const h = (r * 73856093) ^ (c * 19349663) ^ ((r + c) * 83492791);
      cells.push((h & 0xff) > 130);
    }
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${N}, 1fr)`, gap: 1, aspectRatio: "1/1" }}>
      {cells.map((on, i) => (
        <div key={i} style={{ background: on ? "var(--rbk-ink)" : "transparent" }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────── RATING
function RatingScreen({ go, screen, ctx }) {
  const a = ctx?.artist || { name: "João Santos", photo: "../../assets/portrait-artist.png" };
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState([]);
  const [note, setNote] = useState("");
  const PRESETS = ["Pontual", "Limpo", "Atencioso", "Boa comunicação", "Tatuagem fiel"];
  function toggle(t) { setTags(tags.includes(t) ? tags.filter(x => x !== t) : [...tags, t]); }
  return (
    <Frame screen={screen} setScreen={go} hideNav label="12 Avaliação">
      <Header onBack={() => go("calendar")} title="AVALIAÇÃO" />
      <div style={{ position: "absolute", inset: "80px 24px 32px", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <div style={{ width: 80, height: 80, margin: "0 auto", borderRadius: 40, background: `url(${a.photo}) center/cover` }} />
          <h1 style={{ font: "var(--t-h1)", margin: "14px 0 4px" }}>Como foi com {a.name.split(" ")[0]}?</h1>
          <p style={{ font: "var(--t-body-sm)", color: "var(--rbk-fg-2)", margin: 0 }}>Sua avaliação ajuda outros clientes.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setStars(n)} style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}>
              <iconify-icon
                icon={n <= stars ? "ic:round-star" : "ic:round-star-border"}
                width="38"
                style={{ color: n <= stars ? "var(--rbk-plum)" : "var(--rbk-fg-3)", transition: "all .15s" }}
              ></iconify-icon>
            </button>
          ))}
        </div>

        <div style={{ font: "600 11px/1 var(--font-body)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--rbk-fg-3)", margin: "26px 0 10px" }}>
          O que se destacou?
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PRESETS.map(t => (
            <button key={t} onClick={() => toggle(t)} style={{
              padding: "8px 14px", borderRadius: "var(--rbk-r-pill)",
              background: tags.includes(t) ? "var(--rbk-ink)" : "var(--rbk-surface)",
              color: tags.includes(t) ? "#fff" : "var(--rbk-ink)",
              border: 0, font: "600 12px/1 var(--font-body)", cursor: "pointer",
            }}>{t}</button>
          ))}
        </div>

        <textarea
          value={note} onChange={(e) => setNote(e.target.value)}
          placeholder="Conte sua experiência (opcional)…"
          style={{
            marginTop: 20, padding: 14, borderRadius: "var(--rbk-r-md)", border: "1px solid var(--rbk-surface)",
            background: "var(--rbk-surface)", font: "var(--t-body-sm)", color: "var(--rbk-ink)",
            resize: "none", minHeight: 90, outline: "none", fontFamily: "var(--font-body)",
          }}
        />

        <div style={{ marginTop: "auto" }}>
          <Button full onClick={() => go("home")} disabled={stars === 0}>
            {stars === 0 ? "Toque em uma estrela" : "Enviar Avaliação"}
          </Button>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── ARTIST DASHBOARD
function DashboardScreen({ go, screen }) {
  const metrics = [
    { label: "Faturamento", value: "R$ 4.820", delta: "+12%", up: true },
    { label: "Sessões", value: "18", delta: "+4 vs mês passado", up: true },
    { label: "Avaliação", value: "4,9", delta: "32 reviews", up: true },
    { label: "No-shows", value: "2", delta: "−1", up: false },
  ];
  const days = [3, 5, 4, 7, 6, 8, 5, 9, 6, 8, 10, 7, 11, 8];
  const max = Math.max(...days);
  return (
    <Frame screen={screen} setScreen={go} label="13 Dashboard">
      <div style={{ position: "absolute", inset: "60px 24px 96px", overflow: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>Olá, João</div>
            <h1 style={{ font: "var(--t-display-lg)", margin: "6px 0 0" }}>Seu mês</h1>
          </div>
          <button style={{ background: "var(--rbk-surface)", border: 0, borderRadius: "var(--rbk-r-sm)", padding: "8px 12px", font: "600 12px/1 var(--font-body)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            Outubro <iconify-icon icon="ic:round-chevron-right" width="14" style={{ transform: "rotate(90deg)" }}></iconify-icon>
          </button>
        </div>

        {/* metrics grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-md)", padding: 14 }}>
              <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{m.label}</div>
              <div style={{ font: "700 22px/1 var(--font-body)", marginTop: 8 }}>{m.value}</div>
              <div style={{ font: "var(--t-caption)", marginTop: 6, color: m.up ? "var(--rbk-plum)" : "#b15a5a", display: "flex", alignItems: "center", gap: 4 }}>
                <iconify-icon icon={m.up ? "ph:trend-up-bold" : "ph:trend-down-bold"} width="12"></iconify-icon>
                {m.delta}
              </div>
            </div>
          ))}
        </div>

        {/* chart */}
        <div style={{ background: "var(--rbk-ink)", color: "#fff", borderRadius: "var(--rbk-r-lg)", padding: 18, marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ font: "600 11px/1 var(--font-body)", letterSpacing: ".1em", color: "#a89c95" }}>SESSÕES POR SEMANA</span>
            <span style={{ font: "var(--t-caption)", color: "#a89c95" }}>últimas 14 sem</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80, marginTop: 18 }}>
            {days.map((d, i) => (
              <div key={i} style={{
                flex: 1, height: `${(d/max)*100}%`, borderRadius: 3,
                background: i === days.length - 1 ? "var(--rbk-plum)" : "rgba(255,255,255,.18)",
              }} />
            ))}
          </div>
        </div>

        {/* upcoming */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h3 style={{ font: "var(--t-h3)", margin: 0 }}>Próximas sessões</h3>
            <button onClick={() => go("calendar")} style={{ background: "transparent", border: 0, font: "700 12px/1 var(--font-body)", color: "var(--rbk-plum)", cursor: "pointer" }}>Ver todas</button>
          </div>
          {[
            { who: "Maria Silva", initials: "MS", when: "Hoje · 16:00", style: "Fineline · braço",   status: "hoje",       code: "RBK-4729", price: "R$ 450", deposit: "R$ 90 pago", address: "Rua Augusta, 1200 — Pinheiros", distance: "" },
            { who: "Pedro Lima",  initials: "PL", when: "Amanhã · 10:00", style: "Realismo · costas", status: "confirmada", code: "RBK-4801", price: "R$ 620", deposit: "R$ 124 pago", address: "Rua Augusta, 1200 — Pinheiros", distance: "" },
          ].map(s => (
            <button key={s.who} onClick={() => go("session", {
              session: {
                clientName: s.who, clientInitials: s.initials,
                artistName: "Você (Estúdio Augusta)", artistPhoto: "../../assets/portrait-artist.png",
                date: s.when, duration: "2h", style: s.style, address: s.address, distance: s.distance,
                price: s.price, deposit: s.deposit, status: s.status, code: s.code,
              },
              role: "artista",
            })}
            style={{ background: s.status === "hoje" ? "var(--rbk-ink)" : "var(--rbk-surface)", color: s.status === "hoje" ? "var(--rbk-surface)" : "var(--rbk-ink)", borderRadius: "var(--rbk-r-md)", padding: 14, display: "flex", alignItems: "center", gap: 12, marginBottom: 8, border: 0, cursor: "pointer", width: "100%", textAlign: "left" }}>
              <div style={{ width: 40, height: 40, borderRadius: "var(--rbk-r-xl)", background: s.status === "hoje" ? "var(--rbk-plum)" : "var(--rbk-ink)", color: "#fff", display: "grid", placeItems: "center", font: "600 13px/1 var(--font-body)" }}>
                {s.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: "600 14px/1.1 var(--font-body)" }}>{s.who}</div>
                <div style={{ font: "var(--t-caption)", marginTop: 4, opacity: s.status === "hoje" ? .85 : .6 }}>{s.style}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div style={{ font: "var(--t-caption)", fontWeight: 600 }}>{s.when}</div>
                {s.status === "hoje" && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: "var(--rbk-r-pill)", background: "var(--rbk-plum)", color: "#fff", font: "700 10px/1 var(--font-body)", letterSpacing: ".06em" }}>
                    <iconify-icon icon="mdi:qrcode-scan" width="12"></iconify-icon> LER QR
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

Object.assign(window, { PostTattooScreen, CheckinScreen, RatingScreen, DashboardScreen });
