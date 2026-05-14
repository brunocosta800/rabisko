// Frame.jsx — the 402×874 mobile screen with cream bottom nav
// Loaded as Babel script; exports Frame to window.

function Frame({ children, screen, setScreen, hideNav, label }) {
  return (
    <div data-screen-label={label} style={{
      position: "relative",
      width: 402, height: 874,
      background: "var(--rbk-bg)",
      overflow: "hidden",
      fontFamily: "var(--font-body)",
      color: "var(--rbk-ink)",
      borderRadius: 48,
    }}>
      {/* keyed wrapper — re-mounts on every screen change so the entry animation replays */}
      <div key={screen || label} data-screen-anim style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 48 }}>
        {children}
      </div>
      {!hideNav && <BottomNav screen={screen} setScreen={setScreen} />}
    </div>
  );
}

window.Frame = Frame;
