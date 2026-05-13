// BottomNav.jsx — 80pt cream bar, four 48px Iconify tabs
// "screen" is the current named screen; "home/chat/calendar/settings"
// trigger plum tint when active or when on one of the related sub-screens.

const NAV_GROUP = {
  home:    ["home", "artist", "booking", "booking2", "payment", "landing", "login"],
  chat:    ["chat"],
  calendar:["calendar"],
  settings:["settings"],
};

function NavIcon({ icon, target, screen, setScreen }) {
  const active = NAV_GROUP[target]?.includes(screen);
  return (
    <button
      onClick={() => setScreen(target === "home" ? "home" : target)}
      className={active ? "rbk-nav-active" : ""}
      style={{
        background: "transparent", border: 0, padding: 0, cursor: "pointer",
        width: 48, height: 48, display: "grid", placeItems: "center", position: "relative",
        color: active ? "var(--rbk-plum)" : "var(--rbk-ink)",
      }}
      aria-label={target}
    >
      <iconify-icon icon={icon} width="40" />
      <span style={{
        position: "absolute", bottom: 2, left: "50%",
        width: active ? 18 : 0, height: 3, borderRadius: 2,
        background: "var(--rbk-plum)",
        transform: "translateX(-50%)",
        transition: "width var(--dur-med) var(--ease-spring)",
      }} />
    </button>
  );
}

function BottomNav({ screen, setScreen }) {
  return (
    <div style={{
      position: "absolute", left: 0, bottom: 0, width: 402, height: 80,
      background: "var(--rbk-surface)",
      display: "flex", alignItems: "center", justifyContent: "space-around",
      paddingInline: 32, boxSizing: "border-box",
    }}>
      <NavIcon icon="boxicons:home-filled" target="home"     screen={screen} setScreen={setScreen} />
      <NavIcon icon="majesticons:chat"     target="chat"     screen={screen} setScreen={setScreen} />
      <NavIcon icon="solar:calendar-bold"  target="calendar" screen={screen} setScreen={setScreen} />
      <NavIcon icon="solar:settings-bold"  target="settings" screen={screen} setScreen={setScreen} />
    </div>
  );
}

window.BottomNav = BottomNav;
