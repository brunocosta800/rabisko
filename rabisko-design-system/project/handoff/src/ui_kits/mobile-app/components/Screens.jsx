// Screens.jsx — each named screen of the click-thru prototype.
// All exports attach to window so the entrypoint can import them.

const { useState } = React;
const { Frame, Header, Button, SmallButton, Field, BottomNav, FilterChip, PrefChip, StatusPill, ArtistCard, CalendarMini, Stepper, Toast } = window;

// ─────────────────────────────────────────────── LANDING
function LandingScreen({ go, screen }) {
  return (
    <Frame screen={screen} setScreen={go} hideNav label="01 Landing">
      <div style={{ position: "absolute", inset: 0, background: "var(--rbk-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
        <div style={{
          width: 132, height: 132, borderRadius: "var(--rbk-r-2xl)", background: "var(--rbk-ink) url('../../assets/logo-bisko-mark.png') center/cover",
          marginBottom: 28,
        }} />
        <h1 style={{ font: "var(--t-display-xl)", fontSize: 64, letterSpacing: ".02em", margin: 0 }}>RABISKO</h1>
        <p style={{ font: "var(--t-body)", maxWidth: 280, color: "var(--rbk-fg-2)", marginTop: 14, marginBottom: 48 }}>
          Transforme sua vida com um Rabisko.
        </p>
        <Button full onClick={() => go("login")}>Entrar</Button>
        <div style={{ marginTop: 18, font: "var(--t-body-sm)", color: "var(--rbk-fg-2)" }}>
          Novo por aqui? <button onClick={() => go("cadastro")} style={{ background: "transparent", border: 0, color: "var(--rbk-ink)", fontWeight: 700, font: "var(--t-body-sm)", cursor: "pointer", padding: 0 }}>Criar conta</button>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── LOGIN
const ROLES = [
  { id: "cliente", label: "Cliente", icon: "ph:user-bold" },
  { id: "artista", label: "Artista", icon: "ph:paint-brush-bold" },
  { id: "estudio", label: "Estúdio", icon: "ph:storefront-bold" },
];

function RoleSwitch({ role, setRole }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, background: "var(--rbk-surface)", padding: 4, borderRadius: "var(--rbk-r-md)" }}>
      {ROLES.map(r => (
        <button key={r.id} onClick={() => setRole(r.id)} style={{
          padding: "10px 6px", borderRadius: "var(--rbk-r-xs)", border: 0, cursor: "pointer",
          background: role === r.id ? "var(--rbk-ink)" : "transparent",
          color: role === r.id ? "#fff" : "var(--rbk-ink)",
          font: "600 12px/1 var(--font-body)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          transition: "all .15s",
        }}>
          <iconify-icon icon={r.icon} width="14"></iconify-icon>
          {r.label}
        </button>
      ))}
    </div>
  );
}

function LoginScreen({ go, screen }) {
  const [role, setRole] = useState("cliente");
  const [email, setEmail] = useState("contato@studio.com");
  const [pw, setPw]       = useState("***********");
  const [reveal, setReveal] = useState(false);
  const copy = {
    cliente: { h1: "Bem-vindo de volta", sub: "Encontre artistas, agende sessões e acompanhe sua cicatrização." },
    artista: { h1: "Bem-vindo, artista", sub: "Gerencie sua agenda, portfólio e ganhe novos clientes." },
    estudio: { h1: "Bem-vindo, estúdio", sub: "Acompanhe seus tatuadores e a saúde do seu negócio." },
  }[role];
  return (
    <Frame screen={screen} setScreen={go} label="02 Login">
      <Header title="" onBack={() => go("landing")} />
      <div style={{ position: "absolute", inset: "73px 32px 96px", display: "flex", flexDirection: "column" }}>
        <h1 style={{ font: "var(--t-display-lg)", margin: 0 }}>{copy.h1}</h1>
        <p style={{ font: "var(--t-body-sm)", marginTop: 10, color: "var(--rbk-ink)", maxWidth: 280 }}>{copy.sub}</p>

        <div style={{ marginTop: 22 }}>
          <RoleSwitch role={role} setRole={setRole} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22 }}>
          <Field icon="famicons:mail" label="E-mail" value={email} onChange={setEmail} />
          <Field icon="boxicons:lock-filled" label="Senha" type={reveal ? "text" : "password"} value={pw} onChange={setPw} trailingIcon={reveal ? "weui:eyes-on-filled" : "weui:eyes-off-filled"} onTrailingClick={() => setReveal(v => !v)} />
        </div>
        <button style={{ alignSelf: "flex-end", marginTop: 12, background: "transparent", border: 0, color: "var(--rbk-plum)", font: "700 12px/1 var(--font-body)", cursor: "pointer" }}>Esqueceu a Senha?</button>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          <Button full onClick={() => go(role === "artista" || role === "estudio" ? "dashboard" : "home")}>Entrar</Button>
          <div style={{ font: "var(--t-body-sm)", color: "var(--rbk-fg-2)" }}>
            Ainda não tem conta? <button onClick={() => go("cadastro", { role })} style={{ background: "transparent", border: 0, color: "var(--rbk-ink)", fontWeight: 700, font: "var(--t-body-sm)", cursor: "pointer", padding: 0 }}>Criar conta</button>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── CADASTRO
function CadastroScreen({ go, screen, ctx }) {
  const [role, setRole] = useState(ctx?.role || "cliente");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  // role-specific
  const [estilo, setEstilo] = useState("Realismo");
  const [instagram, setInstagram] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  const ESTILOS = ["Realismo", "Fineline", "Blackwork", "Old School", "Minimalista", "Aquarela"];

  const copy = {
    cliente: { h1: "Criar conta", sub: "Encontre o artista ideal para sua próxima tatuagem." },
    artista: { h1: "Sou artista",  sub: "Comece a receber clientes pela plataforma." },
    estudio: { h1: "Sou estúdio",  sub: "Cadastre seu estúdio e seus tatuadores." },
  }[role];

  return (
    <Frame screen={screen} setScreen={go} hideNav label="02b Cadastro">
      <Header title="" onBack={() => go("login")} />
      <div style={{ position: "absolute", inset: "73px 32px 32px", display: "flex", flexDirection: "column", overflow: "auto" }}>
        <h1 style={{ font: "var(--t-display-lg)", margin: 0 }}>{copy.h1}</h1>
        <p style={{ font: "var(--t-body-sm)", marginTop: 10, color: "var(--rbk-ink)" }}>{copy.sub}</p>

        <div style={{ marginTop: 22 }}>
          <RoleSwitch role={role} setRole={setRole} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22 }}>
          <Field icon="ph:user-bold" label={role === "estudio" ? "Nome fantasia" : "Nome completo"} value={nome} onChange={setNome} />
          <Field icon="famicons:mail" label="E-mail" value={email} onChange={setEmail} />
          <Field icon="boxicons:lock-filled" label="Senha" type="password" value={pw} onChange={setPw} />

          {role === "artista" && (
            <>
              <Field icon="ph:instagram-logo-bold" label="@ no Instagram" value={instagram} onChange={setInstagram} />
              <div>
                <div style={{ font: "600 11px/1 var(--font-body)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--rbk-fg-3)", marginBottom: 10 }}>
                  Estilo principal
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ESTILOS.map(e => (
                    <button key={e} onClick={() => setEstilo(e)} type="button" style={{
                      padding: "8px 14px", borderRadius: "var(--rbk-r-pill)", border: 0, cursor: "pointer",
                      background: estilo === e ? "var(--rbk-ink)" : "var(--rbk-surface)",
                      color: estilo === e ? "#fff" : "var(--rbk-ink)",
                      font: "600 12px/1 var(--font-body)",
                    }}>{e}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {role === "estudio" && (
            <>
              <Field icon="ph:identification-card-bold" label="CNPJ" value={cnpj} onChange={setCnpj} />
              <Field icon="ph:map-pin-bold" label="Endereço completo" value={endereco} onChange={setEndereco} />
            </>
          )}
        </div>

        <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 18, display: "flex", alignItems: "flex-start", gap: 8 }}>
          <iconify-icon icon="material-symbols:info-rounded" width="14" style={{ flexShrink: 0, marginTop: 2 }}></iconify-icon>
          <span>
            {role === "cliente" && "Ao continuar você concorda com os Termos e a Política de Privacidade."}
            {role === "artista" && "Após o cadastro, complete seu portfólio e aceite os termos para aparecer nas buscas."}
            {role === "estudio" && "Após validarmos o CNPJ você poderá adicionar tatuadores ao seu estúdio."}
          </span>
        </div>

        <div style={{ marginTop: 22 }}>
          <Button full onClick={() => go(role === "cliente" ? "home" : "dashboard")}>
            {role === "cliente" ? "Criar conta" : (role === "artista" ? "Continuar para portfólio" : "Cadastrar estúdio")}
          </Button>
          <div style={{ textAlign: "center", marginTop: 12, font: "var(--t-body-sm)", color: "var(--rbk-fg-2)" }}>
            Já tem conta? <button onClick={() => go("login")} style={{ background: "transparent", border: 0, color: "var(--rbk-ink)", fontWeight: 700, font: "var(--t-body-sm)", cursor: "pointer", padding: 0 }}>Entrar</button>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── HOME
const PORTFOLIO = ["../../assets/tattoo-work-1.png", "../../assets/tattoo-work-2.png"];
const ARTISTS = [
  { id: "joao", name: "João Santos", rating: "4,9", tags: ["Realismo", "Minimalista"], style: "Blackwork",  photo: "../../assets/portrait-artist.png", portfolio: PORTFOLIO },
  { id: "ana",  name: "Ana Costa",   rating: "4,8", tags: ["Aquarela", "Minimalista"], style: "Aquarela",   photo: "../../assets/tattoo-work-2.png",   portfolio: PORTFOLIO },
  { id: "lia",  name: "Lia Prata",   rating: "4,9", tags: ["Animais", "Realismo"],    style: "Realismo",   photo: "../../assets/tattoo-work-1.png",   portfolio: PORTFOLIO },
  { id: "miguel", name: "Miguel R.", rating: "4,7", tags: ["Flores", "Minimalista"],  style: "Fineline",   photo: "../../assets/portrait-artist.png", portfolio: PORTFOLIO },
];
window.ARTISTS = ARTISTS;

function FavRail({ go }) {
  const { favs } = window.useFavorites();
  const list = ARTISTS.filter(a => favs.has(a.id));
  if (list.length === 0) return null;
  return (
    <div style={{ marginTop: 22 }}>
      <SectionTitle title="Favoritos" caption={`${list.length} ${list.length === 1 ? "artista salvo" : "artistas salvos"}`} />
      <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "10px 24px 4px", scrollbarWidth: "none" }}>
        {list.map(a => (
          <button key={a.id} onClick={() => go("artist", { artist: a })} style={{
            flex: "0 0 auto", width: 132, border: 0, background: "transparent", padding: 0, cursor: "pointer", textAlign: "left",
          }}>
            <div style={{ position: "relative", width: 132, height: 132, borderRadius: "var(--rbk-r-lg)", background: `url(${a.photo}) center/cover` }}>
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <window.FavButton id={a.id} size={28} />
              </div>
            </div>
            <div style={{ font: "600 13px/1.2 var(--font-body)", marginTop: 8 }}>{a.name}</div>
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 2 }}>{a.style}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeScreen({ go, screen }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Prox");

  const STYLES = [
    { k: "Blackwork",   img: "../../assets/tattoo-work-1.png" },
    { k: "Aquarela",    img: "../../assets/tattoo-work-2.png" },
    { k: "Fineline",    img: "../../assets/tattoo-work-1.png" },
    { k: "Realismo",    img: "../../assets/portrait-artist.png" },
    { k: "Old School",  img: "../../assets/tattoo-work-2.png" },
  ];
  const FLASH = [
    { artist: ARTISTS[0], img: "../../assets/tattoo-work-1.png", price: "R$ 280", title: "Cobra fineline" },
    { artist: ARTISTS[1], img: "../../assets/tattoo-work-2.png", price: "R$ 320", title: "Dália aquarela" },
    { artist: ARTISTS[2], img: "../../assets/tattoo-work-1.png", price: "R$ 240", title: "Lobo minimal" },
  ];

  return (
    <Frame screen={screen} setScreen={go} label="03 Home">
      <div style={{ position: "absolute", inset: "44px 0 80px 0", overflow: "auto" }}>
        {/* Greeting + location */}
        <div style={{ padding: "14px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", letterSpacing: ".06em" }}>OLÁ, MARIA</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, font: "var(--t-body-sm)", color: "var(--rbk-fg-2)" }}>
              <iconify-icon icon="material-symbols:location-on-rounded" width="14"></iconify-icon>
              Pinheiros, São Paulo
            </div>
          </div>
          <button style={{
            width: 40, height: 40, borderRadius: "50%", border: 0, cursor: "pointer",
            background: "var(--rbk-surface)", color: "var(--rbk-ink)", display: "grid", placeItems: "center",
            position: "relative",
          }}>
            <iconify-icon icon="mynaui:bell-solid" width="20"></iconify-icon>
            <span style={{ position: "absolute", top: 8, right: 9, width: 8, height: 8, borderRadius: "50%", background: "var(--rbk-plum)" }} />
          </button>
        </div>

        {/* Hero — big editorial headline */}
        <div style={{ padding: "18px 24px 0" }}>
          <h1 style={{ font: "var(--t-display-xl)", lineHeight: .92, margin: 0, letterSpacing: ".01em" }}>
            ARTISTAS<br/>
            <span style={{ color: "var(--rbk-plum)", fontStyle: "italic", fontFamily: "var(--font-body)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>perto de</span><br/>
            VOCÊ
          </h1>
        </div>

        {/* Search */}
        <div style={{ padding: "16px 24px 0" }}>
          <Field icon="tabler:search" trailingIcon="mdi:filter" placeholder="Artistas, estúdios, estilos..." value={q} onChange={setQ} />
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            <FilterChip icon="fluent:cursor-16-filled" active={filter==="Prox"}     onClick={() => setFilter("Prox")}>Perto</FilterChip>
            <FilterChip icon="vaadin:palete"           active={filter==="Estilo"}   onClick={() => setFilter("Estilo")}>Estilo</FilterChip>
            <FilterChip icon="mdi:money"               active={filter==="Dinheiro"} onClick={() => setFilter("Dinheiro")}>Preço</FilterChip>
            <FilterChip icon="mdi:calendar"            active={filter==="Data"}     onClick={() => setFilter("Data")}>Disponível</FilterChip>
          </div>
        </div>

        {/* Styles strip */}
        <div style={{ marginTop: 26 }}>
          <SectionTitle title="Por estilo" />
          <div style={{ display: "flex", gap: 12, overflow: "auto", padding: "10px 24px 4px", scrollSnapType: "x mandatory" }}>
            {STYLES.map(s => (
              <button key={s.k} onClick={() => go("home")} style={{
                position: "relative", flex: "0 0 96px", height: 128, borderRadius: "var(--rbk-r-lg)", border: 0, cursor: "pointer",
                background: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.65) 100%), url(${s.img}) center/cover`,
                scrollSnapAlign: "start", overflow: "hidden", color: "#fff", padding: 10, display: "flex", alignItems: "flex-end",
              }}>
                <span style={{ font: "700 13px/1 var(--font-body)", letterSpacing: ".02em" }}>{s.k}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Flash do dia — TCC 5.3.1 */}
        <div style={{ marginTop: 22 }}>
          <SectionTitle title="Flash do dia" caption="Desenhos prontos · agenda da semana" pill="Hoje" />
          <div style={{ display: "flex", gap: 12, overflow: "auto", padding: "10px 24px 4px", scrollSnapType: "x mandatory" }}>
            {FLASH.map((f, i) => (
              <button key={i} onClick={() => go("artist", { artist: f.artist })} style={{
                flex: "0 0 168px", borderRadius: "var(--rbk-r-lg)", border: 0, cursor: "pointer", overflow: "hidden",
                background: "var(--rbk-surface)", textAlign: "left", scrollSnapAlign: "start", padding: 0,
              }}>
                <div style={{ height: 168, background: `url(${f.img}) center/cover` }} />
                <div style={{ padding: "10px 12px 12px" }}>
                  <div style={{ font: "600 13px/1.2 var(--font-body)" }}>{f.title}</div>
                  <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 2 }}>{f.artist.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ font: "700 14px/1 var(--font-body)" }}>{f.price}</span>
                    <span style={{ font: "var(--t-caption)", color: "var(--rbk-plum)", fontWeight: 700, letterSpacing: ".06em" }}>FLASH</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Em destaque — boost premium */}
        <div style={{ marginTop: 22 }}>
          <SectionTitle title="Em destaque" caption="Artistas em alta esta semana" />
          <div style={{ padding: "10px 24px 4px" }}>
            <button onClick={() => go("artist", { artist: ARTISTS[0] })} style={{
              position: "relative", display: "block", width: "100%", aspectRatio: "16 / 11",
              borderRadius: "var(--rbk-r-xl)", border: 0, cursor: "pointer", overflow: "hidden",
              background: `linear-gradient(0deg, rgba(0,0,0,.78) 0%, rgba(0,0,0,.1) 50%, rgba(0,0,0,0) 70%), url(${ARTISTS[0].portfolio[0]}) center/cover`,
              color: "#fff", textAlign: "left", padding: 0,
            }}>
              <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,.92)", color: "var(--rbk-ink)", padding: "4px 10px", borderRadius: "var(--rbk-r-pill)", font: "700 11px/1 var(--font-body)", letterSpacing: ".06em", display: "flex", alignItems: "center", gap: 4 }}>
                <iconify-icon icon="material-symbols:bolt-rounded" width="13"></iconify-icon> BOOST
              </div>
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
                <div style={{ font: "var(--t-overline)", letterSpacing: ".1em", opacity: .8 }}>EM DESTAQUE</div>
                <div style={{ font: "var(--t-display-md)", marginTop: 4 }}>{ARTISTS[0].name}</div>
                <div style={{ font: "var(--t-body-sm)", marginTop: 2, opacity: .85 }}>
                  {ARTISTS[0].style} · ★ {ARTISTS[0].rating} · 2,3 km
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Favoritos */}
        <FavRail go={go} />

        {/* Perto de você */}
        <div style={{ marginTop: 22 }}>
          <SectionTitle title="Perto de você" caption={`${ARTISTS.length} artistas em até 5 km`} />
          <div className="rbk-stagger" style={{ padding: "10px 24px 8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {ARTISTS.map(a => (
              <ArtistCard key={a.id} {...a} onClick={() => go("artist", { artist: a })} />
            ))}
          </div>
        </div>

        {/* Tip / educate */}
        <div style={{ margin: "18px 24px 0", padding: "16px 18px", borderRadius: "var(--rbk-r-lg)", background: "var(--rbk-ink)", color: "var(--rbk-surface)", display: "flex", gap: 12, alignItems: "center" }}>
          <iconify-icon icon="fluent:scale-fill-20-filled" width="28" style={{ flex: "0 0 auto" }}></iconify-icon>
          <div style={{ flex: 1 }}>
            <div style={{ font: "var(--t-overline)", letterSpacing: ".08em", opacity: .7 }}>NOVIDADE</div>
            <div style={{ font: "600 14px/1.25 var(--font-body)", marginTop: 4 }}>Simule a tatuagem no seu braço antes de fechar</div>
          </div>
          <button onClick={() => go("bisko")} style={{ background: "var(--rbk-surface)", color: "var(--rbk-ink)", border: 0, cursor: "pointer", padding: "8px 12px", borderRadius: "var(--rbk-r-pill)", font: "700 11px/1 var(--font-body)", letterSpacing: ".06em" }}>ABRIR</button>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </Frame>
  );
}

function SectionTitle({ title, caption, pill }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 24px" }}>
      <div>
        <h2 style={{ font: "var(--t-display-md)", margin: 0, letterSpacing: ".02em" }}>{title}</h2>
        {caption && <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 4 }}>{caption}</div>}
      </div>
      {pill && (
        <span style={{ font: "700 10px/1 var(--font-body)", letterSpacing: ".1em", padding: "5px 9px", borderRadius: "var(--rbk-r-pill)", background: "var(--rbk-plum)", color: "#fff" }}>{pill}</span>
      )}
      {!pill && <button style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--rbk-ink)", font: "600 12px/1 var(--font-body)", letterSpacing: ".04em" }}>Ver tudo →</button>}
    </div>
  );
}

// ─────────────────────────────────────────────── ARTIST PROFILE
function ArtistScreen({ go, screen, ctx }) {
  const a = ctx?.artist || ARTISTS[0];
  return (
    <Frame screen={screen} setScreen={go} label="04 Artist Profile">
      <Header onBack={() => go("home")} title="" />
      <div style={{ position: "absolute", top: 30, right: 20, zIndex: 5 }}>
        {window.FavButton && <window.FavButton id={a.id || a.name} variant="ghost" size={40} />}
      </div>
      <div style={{ position: "absolute", inset: "80px 0 96px", overflow: "auto" }}>
        <div style={{ width: 120, height: 120, borderRadius: 60, margin: "20px auto 12px", background: `url(${a.photo}) center/cover` }} />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
          <span style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-pill)", padding: "4px 12px", font: "var(--t-body-sm)" }}>{a.tags[0]}</span>
        </div>
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 4, marginBottom: 10 }}>
          <span style={{ font: "var(--t-body)" }}>{a.rating}</span>
          <iconify-icon icon="ic:round-star" width="18" />
        </div>
        <h1 style={{ textAlign: "center", font: "var(--t-h1)", margin: 0 }}>{a.name}</h1>

        <div style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-lg)", padding: "20px 22px", margin: "26px 32px 0" }}>
          <h3 style={{ font: "var(--t-h3)", margin: 0, marginBottom: 10 }}>Sobre</h3>
          <p style={{ font: "var(--t-body-sm)", margin: 0, color: "var(--rbk-ink)" }}>
            Tatuador profissional, com trabalhos que transitam entre o minimalismo e o traço mais pesado.
          </p>
          <p style={{ font: "var(--t-body-sm)", margin: 0, marginTop: 14, color: "var(--rbk-ink)" }}>@{a.name.toLowerCase().replace(/\s+/g, ".")}</p>
        </div>

        <div style={{ padding: "26px 32px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ font: "var(--t-h3)", margin: 0 }}>Portifólio</h3>
            <button style={{ background: "transparent", border: 0, font: "700 14px/1 var(--font-body)", color: "var(--rbk-ink)", cursor: "pointer" }}>Ver Todos</button>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
            <div style={{ flex: 1, aspectRatio: "1/1", borderRadius: "var(--rbk-r-xl)", background: "url(../../assets/tattoo-work-1.png) center/cover" }} />
            <div style={{ flex: 1, aspectRatio: "1/1", borderRadius: "var(--rbk-r-xl)", background: "url(../../assets/tattoo-work-2.png) center/cover" }} />
          </div>
        </div>

        <div style={{ padding: "20px 32px 0" }}>
          <h3 style={{ font: "var(--t-h3)", margin: 0, marginBottom: 12 }}>Avaliações</h3>
          <div style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-lg)", padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--rbk-ink)", color: "#fff", display: "grid", placeItems: "center", font: "500 12px/1 var(--font-body)" }}>AM</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ font: "700 11px/1 var(--font-body)" }}>Artur Marcelo</span>
                <span style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>Há 2 horas</span>
              </div>
              <div style={{ display: "flex", gap: 2, margin: "4px 0" }}>
                {[0,1,2,3,4].map(i => <iconify-icon key={i} icon="ic:round-star" width="9" />)}
              </div>
              <div style={{ font: "var(--t-micro)" }}>Atendimento excelente, ambiente seguro e tatuagem com qualidade absurda.</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "26px 32px 8px" }}>
          <Button full onClick={() => go("chat", { artist: a })}>Iniciar Conversa</Button>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── BOOKING
function BookingScreen({ go, screen, ctx }) {
  const a = ctx?.artist || ARTISTS[0];
  const [day, setDay] = useState(14);
  const [time, setTime] = useState("14:00");
  return (
    <Frame screen={screen} setScreen={go} label="05 Booking">
      <Header title="RESERVA" onBack={() => go("artist", { artist: a })} />
      <div style={{ position: "absolute", inset: "68px 24px 96px", overflow: "auto" }}>
        <Stepper current={1} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, padding: "0 8px" }}>
          <div style={{ width: 46, height: 46, borderRadius: 23, background: `url(${a.photo}) center/cover` }} />
          <div>
            <div style={{ font: "600 14px/1.1 var(--font-body)" }}>{a.name}</div>
            <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{a.tags.join(" · ")}</div>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <CalendarMini selected={day} onSelect={setDay} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "22px 8px 12px" }}>
          <h3 style={{ font: "var(--t-h3)", margin: 0 }}>Horário</h3>
          <span style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{day} Out · {time}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, padding: "0 8px" }}>
          {["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map(t => (
            <button key={t} onClick={() => setTime(t)} style={{
              border: 0, cursor: "pointer", padding: "12px 0", borderRadius: "var(--rbk-r-md)",
              background: time === t ? "var(--rbk-ink)" : "var(--rbk-surface)",
              color: time === t ? "#fff" : "var(--rbk-ink)",
              font: "600 13px/1 var(--font-body)",
              transition: "all .15s",
            }}>{t}</button>
          ))}
        </div>

        <div style={{ marginTop: 22, padding: "0 8px" }}>
          <Button full onClick={() => go("payment", { artist: a, day, time })}>Avançar para Pagamento</Button>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── PAYMENT
function PaymentScreen({ go, screen, ctx }) {
  const a = ctx?.artist || ARTISTS[0];
  const [method, setMethod] = useState("pix");
  const [loading, setLoading] = useState(false);
  function confirm() {
    setLoading(true);
    setTimeout(() => { setLoading(false); go("confirmed", ctx); }, 900);
  }
  return (
    <Frame screen={screen} setScreen={go} label="06 Payment">
      <Header title="PAGAMENTO" onBack={() => go("booking", ctx)} />
      <div style={{ position: "absolute", inset: "68px 24px 96px", overflow: "auto" }}>
        <Stepper current={2} />
        <div style={{ font: "var(--t-body-sm)", marginTop: 10, marginBottom: 6, padding: "0 8px" }}>Projeto escolhido</div>
        <div style={{ height: 135, borderRadius: "var(--rbk-r-lg)", background: `url(${a.photo}) center/cover`, margin: "0 8px 22px" }} />

        <div style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-lg)", padding: 20, margin: "0 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", font: "var(--t-body)", marginBottom: 10 }}><span>Valor</span><span>R$ 200,00</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", font: "var(--t-body)", marginBottom: 10 }}><span>Sessões</span><span>3x</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", font: "var(--t-body)", marginBottom: 14 }}><span>Taxa da Reserva</span><span>R$ 20,00</span></div>
          <div style={{ borderTop: "1px solid var(--rbk-ink)", paddingTop: 14, display: "flex", justifyContent: "space-between", font: "700 16px/1 var(--font-body)" }}><span>Valor Total</span><span>R$ 220,00</span></div>
        </div>

        <div style={{ font: "var(--t-body-sm)", margin: "22px 8px 12px" }}>Método de Pagamento</div>
        <div style={{ display: "flex", gap: 14, padding: "0 8px" }}>
          <MethodTile icon="ic:baseline-pix" active={method === "pix"} onClick={() => setMethod("pix")} label="Pix" />
          <MethodTile icon="solar:card-bold"  active={method === "card"} onClick={() => setMethod("card")} label="Cartão" />
          <MethodTile icon="fa6-brands:apple-pay" active={method === "apple"} onClick={() => setMethod("apple")} label="Apple Pay" />
        </div>

        <div style={{ marginTop: 14, padding: "0 8px", display: "flex", alignItems: "center", gap: 8, font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>
          <iconify-icon icon="boxicons:lock-filled" width="14"></iconify-icon>
          <span>Pagamento criptografado. Sua reserva só é liberada após confirmação do artista.</span>
        </div>

        <div style={{ marginTop: 18, padding: "0 8px" }}>
          <Button full onClick={confirm} disabled={loading}>
            {loading ? "Processando…" : "Confirmar Pagamento"}
          </Button>
        </div>
      </div>
    </Frame>
  );
}

function MethodTile({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "14px 0", border: active ? "2px solid var(--rbk-plum)" : "2px solid transparent",
      borderRadius: "var(--rbk-r-md)", background: "var(--rbk-surface)", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--rbk-ink)",
    }}>
      <iconify-icon icon={icon} width="28"></iconify-icon>
      <span style={{ font: "var(--t-caption)" }}>{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────── CHAT
function ChatScreen({ go, screen }) {
  const [msg, setMsg] = useState("");
  return (
    <Frame screen={screen} setScreen={go} label="08 Chat">
      <div style={{ position: "absolute", inset: "64px 32px 96px", overflow: "auto" }}>
        <h1 style={{ font: "var(--t-display-lg)", margin: 0 }}>Mensagens</h1>
        <p style={{ font: "var(--t-body)", marginTop: 8, color: "var(--rbk-ink)" }}>Converse direto com os tatuadores que você reservou</p>

        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { name: "João Santos", avatar: ARTISTS[0].photo, sub: "Combinado! Te vejo na terça-feira...", time: "Ontem" },
            { name: "Ana Costa",   avatar: ARTISTS[1].photo, sub: "Te mando a referência amanhã.", time: "Ontem" },
            { name: "Lia Prata",   avatar: ARTISTS[2].photo, sub: "Pago via Pix mais tarde, ok?", time: "Sex" },
          ].map((m) => (
            <div key={m.name} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 46, height: 46, borderRadius: 23, background: `url(${m.avatar}) center/cover` }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ font: "600 14px/1.1 var(--font-body)" }}>{m.name}</span>
                  <span style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)" }}>{m.time}</span>
                </div>
                <div style={{ font: "var(--t-body-sm)", marginTop: 4, color: "var(--rbk-fg-2)" }}>{m.sub}</div>
              </div>
            </div>
          ))}
          <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", textAlign: "center", marginTop: 14 }}>
            Inicie novas conversas visitando perfil de artistas e clicando em "Enviar Mensagem"
          </div>
        </div>
      </div>

      {/* FAB */}
      <button style={{
        position: "absolute", left: "50%", bottom: 110, transform: "translateX(-50%)",
        width: 45, height: 45, borderRadius: "50%", background: "var(--rbk-surface)",
        border: 0, cursor: "pointer", display: "grid", placeItems: "center", color: "var(--rbk-ink)",
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
      }} aria-label="Nova conversa">
        <iconify-icon icon="fluent:chat-add-16-filled" width="22" />
      </button>
    </Frame>
  );
}

// ─────────────────────────────────────────────── SETTINGS (stub)
function SettingsScreen({ go, screen }) {
  const rows = [
    { icon: "qlementine-icons:user-16", label: "Meu Perfil" },
    { icon: "mdi:calendar", label: "Meus Pedidos" },
    { icon: "solar:card-bold", label: "Métodos de Pagamento" },
    { icon: "mynaui:bell-solid", label: "Notificações" },
    { icon: "material-symbols:help-rounded", label: "Ajuda" },
  ];
  return (
    <Frame screen={screen} setScreen={go} label="08 Settings">
      <div style={{ position: "absolute", inset: "64px 32px 96px" }}>
        <h1 style={{ font: "var(--t-display-lg)", margin: 0 }}>Configurações</h1>
        <p style={{ font: "var(--t-body)", marginTop: 8 }}>Gerencie sua conta, pedidos, pagamentos e preferências</p>
        <div style={{ marginTop: 22, background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-lg)", overflow: "hidden" }}>
          {rows.map((r, i) => (
            <button key={r.label} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
              background: "transparent", border: 0, borderTop: i ? "1px solid rgba(0,0,0,.06)" : 0,
              cursor: "pointer", color: "var(--rbk-ink)", font: "var(--t-body-lg)",
            }}>
              <iconify-icon icon={r.icon} width="22"></iconify-icon>
              <span style={{ flex: 1, textAlign: "left" }}>{r.label}</span>
              <iconify-icon icon="ic:round-chevron-right" width="22" style={{ color: "var(--rbk-fg-3)" }}></iconify-icon>
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────── CALENDAR
function CalendarScreen({ go, screen }) {
  const [view, setView] = useState("upcoming");
  const sessions = [
    { id: 1, artistName: "João Santos", artistPhoto: ARTISTS[0].photo, date: "Hoje · 14:00",   duration: "3h", style: "Blackwork · antebraço", address: "Rua Augusta, 1200 — Pinheiros", distance: "320 m", price: "R$ 450", deposit: "R$ 90 pago",  status: "hoje",       code: "RBK-4729" },
    { id: 2, artistName: "Ana Costa",   artistPhoto: ARTISTS[1].photo, date: "Sex · 19 Out · 18:30", duration: "2h", style: "Aquarela · panturrilha", address: "Rua Aspicuelta, 320 — Vila Madalena", distance: "1,2 km", price: "R$ 320", deposit: "R$ 64 pago",  status: "confirmada", code: "RBK-5102" },
    { id: 3, artistName: "Lia Prata",   artistPhoto: ARTISTS[2].photo, date: "Sáb · 27 Out · 11:00", duration: "4h", style: "Realismo · braço",        address: "Rua dos Pinheiros, 700 — Pinheiros", distance: "800 m", price: "R$ 720", deposit: "R$ 144 pago", status: "confirmada", code: "RBK-5188" },
  ];
  const past = [
    { id: 9, artistName: "João Santos", artistPhoto: ARTISTS[0].photo, date: "Set · 22 Set · 15:00", duration: "2h", style: "Blackwork · pulso",    address: "Rua Augusta, 1200", distance: "320 m", price: "R$ 280", deposit: "Pago",        status: "concluida",  code: "RBK-4621" },
  ];
  const list = view === "upcoming" ? sessions : past;

  return (
    <Frame screen={screen} setScreen={go} label="09 Calendar">
      <div style={{ position: "absolute", inset: "44px 24px 80px", overflow: "auto" }}>
        <div style={{ padding: "16px 0 8px" }}>
          <div style={{ font: "var(--t-overline)", letterSpacing: ".1em", color: "var(--rbk-fg-3)" }}>MINHA AGENDA</div>
          <h1 style={{ font: "var(--t-display-lg)", margin: "6px 0 0" }}>Sessões</h1>
        </div>

        <CalendarMini selected={14} />

        <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-pill)", marginTop: 16, font: "600 12px/1 var(--font-body)" }}>
          {[["upcoming","Próximas"],["past","Concluídas"]].map(([k, label]) => (
            <button key={k} onClick={() => setView(k)} style={{
              flex: 1, padding: "10px", borderRadius: "var(--rbk-r-pill)", border: 0, cursor: "pointer",
              background: view === k ? "var(--rbk-ink)" : "transparent",
              color: view === k ? "var(--rbk-surface)" : "var(--rbk-ink)",
            }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map(s => (
            <SessionRow key={s.id} s={s} onOpen={() => go("session", { session: s, role: "cliente" })} />
          ))}
          {list.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--rbk-fg-3)", font: "var(--t-body-sm)" }}>
              Nenhuma sessão por aqui ainda.
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}

function SessionRow({ s, onOpen }) {
  const isToday = s.status === "hoje";
  const isDone = s.status === "concluida";
  return (
    <button onClick={onOpen} style={{
      display: "flex", gap: 14, padding: "14px", border: 0, cursor: "pointer",
      background: isToday ? "var(--rbk-ink)" : "var(--rbk-surface)",
      color: isToday ? "var(--rbk-surface)" : "var(--rbk-ink)",
      borderRadius: "var(--rbk-r-lg)", textAlign: "left", alignItems: "center",
    }}>
      <div style={{ width: 52, height: 52, borderRadius: "var(--rbk-r-md)", background: `url(${s.artistPhoto}) center/cover`, flex: "0 0 52px" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ font: "600 14px/1.1 var(--font-body)" }}>{s.artistName}</span>
          {isToday && (
            <span style={{ font: "700 10px/1 var(--font-body)", letterSpacing: ".08em", background: "var(--rbk-plum)", color: "#fff", padding: "3px 7px", borderRadius: "var(--rbk-r-pill)" }}>HOJE</span>
          )}
        </div>
        <div style={{ font: "var(--t-caption)", marginTop: 4, opacity: isToday ? .85 : .6 }}>
          {s.style}
        </div>
        <div style={{ font: "var(--t-caption)", marginTop: 2, opacity: isToday ? .85 : .55 }}>
          {s.date} · {s.duration}
        </div>
      </div>
      {isToday ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 10px", borderRadius: "var(--rbk-r-pill)", background: "var(--rbk-plum)", color: "#fff", font: "700 11px/1 var(--font-body)", letterSpacing: ".06em" }}>
          <iconify-icon icon="mdi:qrcode" width="14"></iconify-icon> CHECK-IN
        </span>
      ) : isDone ? (
        <iconify-icon icon="material-symbols:check-circle-rounded" width="22" style={{ color: "var(--rbk-plum)" }}></iconify-icon>
      ) : (
        <iconify-icon icon="ic:round-chevron-right" width="22" style={{ color: "var(--rbk-fg-3)" }}></iconify-icon>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────── CONFIRMED
function ConfirmedScreen({ go, screen, ctx }) {
  const a = ctx?.artist || ARTISTS[0];
  const day = ctx?.day || 14;
  const time = ctx?.time || "14:00";
  return (
    <Frame screen={screen} setScreen={go} hideNav label="06b Confirmed">
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "68px 32px 32px", background: "var(--rbk-bg)" }}>
        <Stepper current={3} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ position: "relative", width: 96, height: 96, marginBottom: 24 }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--rbk-plum)", opacity: .25, animation: "rbkRingExpand 1.8s var(--ease-out) .15s infinite" }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--rbk-plum)", opacity: .25, animation: "rbkRingExpand 1.8s var(--ease-out) .6s infinite" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--rbk-plum)", display: "grid", placeItems: "center", color: "#fff", animation: "rbkCheckPop 520ms var(--ease-spring) both" }}>
              <iconify-icon icon="material-symbols:check-rounded" width="56"></iconify-icon>
            </div>
          </div>
          <h1 style={{ font: "var(--t-display-lg)", margin: 0 }}>Reserva Confirmada</h1>
          <p style={{ font: "var(--t-body)", color: "var(--rbk-fg-2)", marginTop: 10, maxWidth: 280 }}>
            Você receberá uma confirmação do artista em até 24h. Acompanhe pelo chat.
          </p>
          <div style={{ background: "var(--rbk-surface)", borderRadius: "var(--rbk-r-lg)", padding: 16, marginTop: 24, width: "100%", display: "flex", gap: 12, alignItems: "center", textAlign: "left" }}>
            <div style={{ width: 46, height: 46, borderRadius: 23, background: `url(${a.photo}) center/cover` }} />
            <div style={{ flex: 1 }}>
              <div style={{ font: "600 14px/1.1 var(--font-body)" }}>{a.name}</div>
              <div style={{ font: "var(--t-caption)", color: "var(--rbk-fg-3)", marginTop: 4 }}>Ter {day} Out · {time} · R$ 220,00</div>
            </div>
            <StatusPill tone="plum">Pago</StatusPill>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button full onClick={() => go("chat")}>Abrir Chat com {a.name.split(" ")[0]}</Button>
          <button onClick={() => go("home")} style={{ background: "transparent", border: 0, font: "700 14px/1 var(--font-body)", color: "var(--rbk-ink)", padding: 12, cursor: "pointer" }}>Voltar para Home</button>
        </div>
      </div>
    </Frame>
  );
}

Object.assign(window, {
  LandingScreen, LoginScreen, CadastroScreen, HomeScreen, ArtistScreen,
  BookingScreen, PaymentScreen, ConfirmedScreen, ChatScreen, SettingsScreen, CalendarScreen,
});
