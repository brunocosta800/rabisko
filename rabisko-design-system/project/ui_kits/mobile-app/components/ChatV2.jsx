// ChatV2.jsx — conversation-driven chat with widgets.
// Flow per TCC (curto prazo): cliente escolhe artista → conversa → trocam refs e esboços
// → artista envia widget de simulação → artista envia widget de reserva → cliente paga.
//
// Two viewer modes (client / artist) so we can demo both composers without leaving the screen.

(function () {
  const { useState, useEffect, useRef } = React;
  const { Frame, Header, Button, SmallButton, Field, Stepper } = window;

  const TATTOO_REFS = ["../../assets/tattoo-work-1.png", "../../assets/tattoo-work-2.png"];

  const INITIAL = (artist) => ([
    { id: 1, from: "client", t: "text",
      text: "Oi! Adorei seu portfólio. Queria uma cobra com flores no antebraço, em blackwork.",
      time: "Seg · 19:42" },
    { id: 2, from: "artist", t: "text",
      text: "Oi! Que ideia linda — adoro fazer essa mistura. Te mando um esboço amanhã, pode ser?",
      time: "Seg · 20:10" },
    { id: 3, from: "artist", t: "sketch", url: artist.portfolio?.[0] || TATTOO_REFS[0],
      caption: "Primeira ideia — cobra envolvendo dália. Linha mais grossa.", time: "Ter · 11:08" },
    { id: 4, from: "client", t: "text",
      text: "Adoreiii. Pode deixar as flores mais delicadas? E a cobra um pouco menor.", time: "Ter · 12:30" },
    { id: 5, from: "artist", t: "sketch", url: artist.portfolio?.[1] || TATTOO_REFS[1],
      caption: "Versão 2 — flores mais finas, cobra reduzida.", time: "Qua · 09:15" },
    { id: 6, from: "client", t: "text", text: "Perfeito! Como fica no braço?", time: "Qua · 09:22" },
    { id: 7, from: "artist", t: "simulate", url: artist.portfolio?.[1] || TATTOO_REFS[1],
      caption: "Simulei no antebraço — toque pra ver no seu.", time: "Qua · 09:40" },
    { id: 8, from: "client", t: "text", text: "Ficou lindo demais. Quando dá pra fechar?", time: "Qua · 09:55" },
    { id: 9, from: "artist", t: "booking",
      date: "14 Out", weekday: "Terça", time: "14:00", duration: "3h",
      price: "R$ 450", deposit: "R$ 90", status: "pending",
      time_sent: "Qua · 10:02" },
  ]);

  // ─────────────────────────────────────────────────────── Bubbles
  function TextBubble({ side, children, time }) {
    const isMe = side === "me";
    return (
      <div style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", margin: "4px 0" }}>
        <div style={{
          maxWidth: "78%",
          background: isMe ? "var(--rbk-ink)" : "var(--rbk-surface)",
          color: isMe ? "var(--rbk-surface)" : "var(--rbk-ink)",
          borderRadius: "var(--rbk-r-lg)", padding: "10px 14px", font: "var(--t-body-sm)",
          borderTopRightRadius: isMe ? 4 : 16, borderTopLeftRadius: isMe ? 16 : 4,
          boxShadow: isMe ? "none" : "0 1px 2px rgba(0,0,0,.04)",
        }}>
          <div style={{ whiteSpace: "pre-wrap" }}>{children}</div>
          <div style={{ font: "10px/1 var(--font-body)", marginTop: 6, opacity: .55, textAlign: "right" }}>{time}</div>
        </div>
      </div>
    );
  }

  function SketchBubble({ side, url, caption, time }) {
    const isMe = side === "me";
    return (
      <div style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", margin: "6px 0" }}>
        <div style={{
          width: 220, background: isMe ? "var(--rbk-ink)" : "var(--rbk-surface)",
          color: isMe ? "var(--rbk-surface)" : "var(--rbk-ink)",
          borderRadius: "var(--rbk-r-lg)", overflow: "hidden",
          borderTopRightRadius: isMe ? 4 : 16, borderTopLeftRadius: isMe ? 16 : 4,
        }}>
          <div style={{ height: 200, background: `url(${url}) center/cover #111` }} />
          <div style={{ padding: "10px 12px", font: "var(--t-body-sm)" }}>
            <div>{caption}</div>
            <div style={{ font: "10px/1 var(--font-body)", marginTop: 6, opacity: .55, textAlign: "right" }}>{time}</div>
          </div>
        </div>
      </div>
    );
  }

  function SimulateWidget({ side, url, caption, time, onTap, disabled }) {
    const isMe = side === "me";
    return (
      <div style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", margin: "6px 0" }}>
        <div style={{
          width: 240, background: "var(--rbk-plum)", color: "#fff",
          borderRadius: "var(--rbk-r-lg)", overflow: "hidden",
          borderTopRightRadius: isMe ? 4 : 16, borderTopLeftRadius: isMe ? 16 : 4,
        }}>
          <div style={{ position: "relative", height: 180, background: `url(${url}) center/cover #2a1a26` }}>
            <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,.5)", color: "#fff", padding: "4px 8px", borderRadius: "var(--rbk-r-pill)", font: "11px/1 var(--font-body)", display: "flex", alignItems: "center", gap: 6 }}>
              <iconify-icon icon="fluent:scale-fill-20-filled" width="13"></iconify-icon>
              Simulação
            </div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ font: "var(--t-body-sm)", marginBottom: 10 }}>{caption}</div>
            <button onClick={onTap} disabled={disabled} style={{
              width: "100%", padding: "10px 14px", borderRadius: "var(--rbk-r-md)", border: 0,
              background: "rgba(255,255,255,.16)", color: "#fff",
              font: "600 13px/1 var(--font-body)", letterSpacing: ".04em", textTransform: "uppercase",
              cursor: disabled ? "default" : "pointer", opacity: disabled ? .55 : 1,
            }}>
              Ver no meu braço →
            </button>
            <div style={{ font: "10px/1 var(--font-body)", marginTop: 8, opacity: .65, textAlign: "right" }}>{time}</div>
          </div>
        </div>
      </div>
    );
  }

  function BookingWidget({ side, m, time, onTap, disabled, statusLabel }) {
    const isMe = side === "me";
    return (
      <div style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", margin: "6px 0" }}>
        <div style={{
          width: 260, background: "var(--rbk-bg)",
          border: "2px solid var(--rbk-ink)",
          borderRadius: "var(--rbk-r-lg)", padding: 16, color: "var(--rbk-ink)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ font: "var(--t-overline)", letterSpacing: ".08em" }}>RESERVA PROPOSTA</div>
            <iconify-icon icon="mdi:calendar" width="18"></iconify-icon>
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "flex-end", gap: 10 }}>
            <div style={{ font: "var(--t-display-xl)", lineHeight: 1 }}>{m.date.split(" ")[0]}</div>
            <div>
              <div style={{ font: "var(--t-display-sm)", letterSpacing: ".04em" }}>{m.date.split(" ")[1]}</div>
              <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-2)" }}>{m.weekday} · {m.time}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14, font: "var(--t-body-sm)" }}>
            <div><span style={{ color: "var(--rbk-fg-3)" }}>Duração</span><br/><strong>{m.duration}</strong></div>
            <div><span style={{ color: "var(--rbk-fg-3)" }}>Valor</span><br/><strong>{m.price}</strong></div>
            <div style={{ gridColumn: "1 / span 2" }}><span style={{ color: "var(--rbk-fg-3)" }}>Sinal para confirmar</span><br/><strong>{m.deposit}</strong></div>
          </div>
          {statusLabel ? (
            <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: "var(--rbk-r-sm)", background: "rgba(123, 81, 122, .12)", color: "var(--rbk-plum)", font: "600 12px/1.2 var(--font-body)", textAlign: "center" }}>
              {statusLabel}
            </div>
          ) : (
            <button onClick={onTap} disabled={disabled} style={{
              width: "100%", marginTop: 14, padding: "12px 14px", borderRadius: "var(--rbk-r-md)", border: 0,
              background: "var(--rbk-ink)", color: "var(--rbk-surface)",
              font: "600 13px/1 var(--font-body)", letterSpacing: ".04em", textTransform: "uppercase",
              cursor: disabled ? "default" : "pointer", opacity: disabled ? .55 : 1,
            }}>
              Aceitar e pagar sinal
            </button>
          )}
          <div style={{ font: "10px/1 var(--font-body)", marginTop: 10, opacity: .55, textAlign: "right" }}>{time}</div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────── Conversation View
  function ConversationView({ go, screen, artist }) {
    const [role, setRole] = useState("cliente"); // viewer perspective
    const [messages, setMessages] = useState(() => INITIAL(artist));
    const [draft, setDraft] = useState("");
    const [showBookingForm, setShowBookingForm] = useState(false);
    const scrollerRef = useRef(null);

    useEffect(() => {
      if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }, [messages]);

    const isClient = role === "cliente";

    function pushMessage(m) {
      setMessages((prev) => [...prev, { id: Date.now() + Math.random(), ...m, time: "Agora" }]);
    }

    function sendText() {
      if (!draft.trim()) return;
      pushMessage({ from: isClient ? "client" : "artist", t: "text", text: draft.trim() });
      setDraft("");
    }

    function sendArtistSketch() {
      pushMessage({ from: "artist", t: "sketch", url: artist.portfolio?.[Math.floor(Math.random()*(artist.portfolio?.length || 1))] || TATTOO_REFS[0],
                    caption: "Novo esboço — me diga o que acha." });
    }
    function sendArtistSimulate() {
      pushMessage({ from: "artist", t: "simulate", url: artist.portfolio?.[0] || TATTOO_REFS[0],
                    caption: "Simulação atualizada — abre pra testar no seu braço." });
    }
    function sendArtistBooking(form) {
      pushMessage({ from: "artist", t: "booking", ...form, status: "pending" });
      setShowBookingForm(false);
    }

    function handleBookingTap(msgId) {
      const msg = messages.find(m => m.id === msgId);
      if (!msg) return;
      go("payment", { artist, day: parseInt(msg.date), time: msg.time, duration: msg.duration, price: msg.price, deposit: msg.deposit, fromChat: true });
    }
    function handleSimulateTap(msg) {
      go("bisko", { artist, simulateUrl: msg.url });
    }

    return (
      <Frame screen={screen} setScreen={go} hideNav label="08 Chat">
        {/* HEADER */}
        <div style={{ position: "absolute", inset: "44px 0 auto 0", padding: "16px 20px 12px",
                      borderBottom: "1px solid rgba(0,0,0,.06)", background: "var(--rbk-bg)",
                      display: "flex", alignItems: "center", gap: 12, zIndex: 2 }}>
          <button onClick={() => go("artist", { artist })} aria-label="Voltar"
                  style={{ background: "transparent", border: 0, padding: 4, cursor: "pointer", color: "var(--rbk-ink)" }}>
            <iconify-icon icon="ic:round-arrow-back" width="22"></iconify-icon>
          </button>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `url(${artist.photo}) center/cover` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "600 14px/1.1 var(--font-body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{artist.name}</div>
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{artist.style || "Tatuador"}</div>
          </div>
          {/* role toggle */}
          <div style={{ display: "flex", padding: 2, background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-pill)", font: "600 11px/1 var(--font-body)" }}>
            {[["cliente","Cliente"],["artista","Artista"]].map(([k, label]) => (
              <button key={k} onClick={() => setRole(k)} style={{
                padding: "6px 10px", borderRadius: "var(--rbk-r-pill)", border: 0, cursor: "pointer",
                background: role === k ? "var(--rbk-ink)" : "transparent",
                color: role === k ? "var(--rbk-surface)" : "var(--rbk-ink)",
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div ref={scrollerRef} style={{ position: "absolute", inset: "104px 0 88px 0", overflow: "auto", padding: "12px 16px 16px" }}>
          {messages.map((m, i) => {
            const side = (m.from === "client" && isClient) || (m.from === "artist" && !isClient) ? "me" : "them";
            const showDay = i === 0 || messages[i-1]?.time?.split(" · ")[0] !== m.time?.split(" · ")[0];
            return (
              <React.Fragment key={m.id}>
                {showDay && m.time?.includes("·") && (
                  <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--rbk-fg-3)", margin: "12px 0 4px" }}>
                    {m.time.split(" · ")[0]}
                  </div>
                )}
                {m.t === "text" && <TextBubble side={side} time={m.time}>{m.text}</TextBubble>}
                {m.t === "sketch" && <SketchBubble side={side} url={m.url} caption={m.caption} time={m.time} />}
                {m.t === "simulate" && (
                  <SimulateWidget side={side} url={m.url} caption={m.caption} time={m.time}
                    onTap={() => handleSimulateTap(m)}
                    disabled={!isClient && side === "me"} />
                )}
                {m.t === "booking" && (
                  <BookingWidget side={side} m={m} time={m.time_sent || m.time}
                    onTap={() => handleBookingTap(m.id)}
                    disabled={!isClient}
                    statusLabel={!isClient && side === "me" ? "Aguardando cliente aceitar" : null} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* COMPOSER */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "10px 12px 14px", background: "var(--rbk-bg)", borderTop: "1px solid rgba(0,0,0,.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* attachments */}
            {isClient ? (
              <button title="Anexar referência" style={composerIconStyle}>
                <iconify-icon icon="material-symbols:image-outline-rounded" width="20"></iconify-icon>
              </button>
            ) : (
              <>
                <button title="Enviar esboço" onClick={sendArtistSketch} style={composerIconStyle}>
                  <iconify-icon icon="material-symbols:brush-outline-rounded" width="20"></iconify-icon>
                </button>
                <button title="Enviar simulação" onClick={sendArtistSimulate} style={{ ...composerIconStyle, background: "var(--rbk-plum)", color: "#fff" }}>
                  <iconify-icon icon="fluent:scale-fill-20-filled" width="20"></iconify-icon>
                </button>
                <button title="Propor reserva" onClick={() => setShowBookingForm(true)} style={{ ...composerIconStyle, background: "var(--rbk-ink)", color: "var(--rbk-surface)" }}>
                  <iconify-icon icon="mdi:calendar-check" width="20"></iconify-icon>
                </button>
              </>
            )}
            {/* input */}
            <input value={draft} onChange={(e) => setDraft(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && sendText()}
                   placeholder={isClient ? "Conta sua ideia…" : "Responder cliente…"}
                   style={{
                     flex: 1, height: 38, border: 0, padding: "0 14px", borderRadius: "var(--rbk-r-pill)",
                     background: "var(--rbk-surface)", font: "var(--t-body-sm)", color: "var(--rbk-ink)", outline: "none",
                   }} />
            <button onClick={sendText} aria-label="Enviar" style={{
              width: 38, height: 38, borderRadius: "50%", border: 0, cursor: "pointer",
              background: "var(--rbk-ink)", color: "var(--rbk-surface)", display: "grid", placeItems: "center",
            }}>
              <iconify-icon icon="material-symbols:send-rounded" width="18"></iconify-icon>
            </button>
          </div>
          {!isClient && (
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", textAlign: "center", marginTop: 6 }}>
              Atalhos exclusivos do artista: esboço · simulação · proposta de reserva
            </div>
          )}
        </div>

        {showBookingForm && <BookingFormSheet artist={artist} onClose={() => setShowBookingForm(false)} onSend={sendArtistBooking} />}
      </Frame>
    );
  }

  const composerIconStyle = {
    width: 38, height: 38, borderRadius: "50%", border: 0, cursor: "pointer",
    background: "var(--rbk-surface)", color: "var(--rbk-ink)", display: "grid", placeItems: "center",
  };

  // ─────────────────────────────────────────────────────── Booking form modal
  function BookingFormSheet({ artist, onClose, onSend }) {
    const [day, setDay] = useState(14);
    const [weekday, setWeekday] = useState("Terça");
    const [time, setTime] = useState("14:00");
    const [duration, setDuration] = useState("3h");
    const [price, setPrice] = useState("450");
    const deposit = "R$ " + Math.round(parseInt(price || "0") * 0.2);

    const days = [
      { d: 12, w: "Dom" }, { d: 13, w: "Seg" }, { d: 14, w: "Ter" },
      { d: 15, w: "Qua" }, { d: 16, w: "Qui" }, { d: 17, w: "Sex" }, { d: 18, w: "Sáb" },
    ];
    const times = ["10:00", "11:30", "14:00", "15:30", "17:00"];
    const durations = ["1h", "2h", "3h", "4h", "5h", "6h"];

    return (
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 10, display: "flex", alignItems: "flex-end" }}>
        <div style={{ background: "var(--rbk-bg)", width: "100%", borderRadius: "20px 20px 0 0", padding: "18px 20px 22px", maxHeight: "85%", overflow: "auto" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--rbk-fg-3)", margin: "0 auto 14px", opacity: .4 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ font: "var(--t-display-md)", margin: 0 }}>PROPOR RESERVA</h2>
            <button onClick={onClose} style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--rbk-ink)" }}>
              <iconify-icon icon="material-symbols:close-rounded" width="22"></iconify-icon>
            </button>
          </div>
          <p style={{ font: "var(--t-body-sm)", color: "var(--rbk-fg-2)", marginTop: 6 }}>
            Envia os termos finais. O cliente aceita pagando o sinal — só então a reserva é confirmada.
          </p>

          <div style={{ font: "var(--t-overline)", letterSpacing: ".08em", marginTop: 14, color: "var(--rbk-fg-3)" }}>DATA</div>
          <div style={{ display: "flex", gap: 8, overflow: "auto", marginTop: 8, paddingBottom: 4 }}>
            {days.map(({ d, w }) => (
              <button key={d} onClick={() => { setDay(d); setWeekday(w === "Ter" ? "Terça" : w === "Qua" ? "Quarta" : w === "Qui" ? "Quinta" : w === "Sex" ? "Sexta" : w === "Sáb" ? "Sábado" : w === "Dom" ? "Domingo" : "Segunda"); }}
                      style={{
                        minWidth: 56, padding: "10px 6px", borderRadius: "var(--rbk-r-md)", border: 0, cursor: "pointer",
                        background: day === d ? "var(--rbk-ink)" : "var(--rbk-surface)",
                        color: day === d ? "var(--rbk-surface)" : "var(--rbk-ink)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                      }}>
                <span style={{ font: "var(--t-caption)" }}>{w}</span>
                <span style={{ font: "700 18px/1 var(--font-body)" }}>{d}</span>
              </button>
            ))}
          </div>

          <div style={{ font: "var(--t-overline)", letterSpacing: ".08em", marginTop: 14, color: "var(--rbk-fg-3)" }}>HORÁRIO</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {times.map(t => (
              <button key={t} onClick={() => setTime(t)} style={pillBtn(time === t)}>{t}</button>
            ))}
          </div>

          <div style={{ font: "var(--t-overline)", letterSpacing: ".08em", marginTop: 14, color: "var(--rbk-fg-3)" }}>DURAÇÃO ESTIMADA</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {durations.map(d => (
              <button key={d} onClick={() => setDuration(d)} style={pillBtn(duration === d)}>{d}</button>
            ))}
          </div>

          <div style={{ font: "var(--t-overline)", letterSpacing: ".08em", marginTop: 14, color: "var(--rbk-fg-3)" }}>VALOR TOTAL</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span style={{ font: "var(--t-display-md)" }}>R$</span>
            <input value={price} onChange={e => setPrice(e.target.value.replace(/\D/g,""))}
                   inputMode="numeric"
                   style={{ flex: 1, height: 44, border: 0, padding: "0 14px", borderRadius: "var(--rbk-r-md)", background: "var(--rbk-surface)", font: "var(--t-display-md)", color: "var(--rbk-ink)" }}/>
          </div>
          <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: "var(--rbk-r-sm)", background: "rgba(123,81,122,.10)", color: "var(--rbk-plum)", font: "var(--t-body-sm)" }}>
            Sinal (20%) que o cliente vai pagar: <strong>{deposit}</strong>
          </div>

          <div style={{ marginTop: 18 }}>
            <Button full onClick={() => onSend({
              date: `${day} Out`, weekday, time, duration,
              price: `R$ ${price}`, deposit,
              time_sent: "Agora",
            })}>Enviar widget de reserva</Button>
          </div>
        </div>
      </div>
    );
  }

  const pillBtn = (active) => ({
    padding: "10px 16px", borderRadius: "var(--rbk-r-pill)", border: 0, cursor: "pointer",
    background: active ? "var(--rbk-ink)" : "var(--rbk-surface)",
    color: active ? "var(--rbk-surface)" : "var(--rbk-ink)",
    font: "600 13px/1 var(--font-body)",
  });

  // ─────────────────────────────────────────────────────── List View (no artist in ctx)
  function ChatListView({ go, screen }) {
    const ARTISTS = window.ARTISTS || [];
    const list = [
      { artist: ARTISTS[0], sub: "Enviou proposta de reserva", time: "Agora", unread: 1 },
      { artist: ARTISTS[1], sub: "Te mando a referência amanhã.", time: "Ontem", unread: 0 },
      { artist: ARTISTS[2], sub: "Pago via Pix mais tarde, ok?", time: "Sex", unread: 0 },
    ].filter(x => x.artist);

    return (
      <Frame screen={screen} setScreen={go} label="08 Chat">
        <div style={{ position: "absolute", inset: "64px 32px 96px", overflow: "auto" }}>
          <h1 style={{ font: "var(--t-display-lg)", margin: 0 }}>Mensagens</h1>
          <p style={{ font: "var(--t-body)", marginTop: 8, color: "var(--rbk-ink)" }}>
            Cada conversa é o seu fluxo com um artista — referências, esboços, simulação e reserva.
          </p>
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 4 }}>
            {list.map((m) => (
              <button key={m.artist.name} onClick={() => go("chat", { artist: m.artist })} style={{
                display: "flex", gap: 12, alignItems: "center", padding: "12px 8px", border: 0,
                background: "transparent", cursor: "pointer", textAlign: "left", borderRadius: "var(--rbk-r-md)",
              }}>
                <div style={{ width: 46, height: 46, borderRadius: 23, background: `url(${m.artist.photo}) center/cover` }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ font: "600 14px/1.1 var(--font-body)" }}>{m.artist.name}</span>
                    <span style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{m.time}</span>
                  </div>
                  <div style={{ font: "var(--t-body-sm)", marginTop: 4, color: "var(--rbk-fg-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.sub}</div>
                </div>
                {m.unread > 0 && (
                  <div style={{ minWidth: 20, height: 20, borderRadius: "var(--rbk-r-sm)", background: "var(--rbk-plum)", color: "#fff", font: "700 11px/20px var(--font-body)", textAlign: "center", padding: "0 6px" }}>{m.unread}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  // ─────────────────────────────────────────────────────── Entry: list or conversation
  function ChatScreen({ go, screen, ctx }) {
    if (ctx?.artist) return <ConversationView go={go} screen={screen} artist={ctx.artist} />;
    return <ChatListView go={go} screen={screen} />;
  }

  // Override the placeholder ChatScreen from Screens.jsx
  window.ChatScreen = ChatScreen;
})();
