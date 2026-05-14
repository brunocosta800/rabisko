// Favorites.jsx — favoritar artistas (persistido em localStorage).

(function () {
  const { useState, useEffect, useCallback } = React;
  const KEY = "rbk:favs:v1";

  function read() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); }
    catch { return new Set(); }
  }
  function write(set) {
    localStorage.setItem(KEY, JSON.stringify([...set]));
    window.dispatchEvent(new CustomEvent("rbk:favs"));
  }

  function useFavorites() {
    const [favs, setFavs] = useState(read);
    useEffect(() => {
      const h = () => setFavs(read());
      window.addEventListener("rbk:favs", h);
      return () => window.removeEventListener("rbk:favs", h);
    }, []);
    const toggle = useCallback((id) => {
      const next = new Set(read());
      next.has(id) ? next.delete(id) : next.add(id);
      write(next);
    }, []);
    const has = useCallback((id) => favs.has(id), [favs]);
    return { favs, has, toggle, count: favs.size };
  }

  // Heart button — variant 'overlay' (sobre foto, escuro) ou 'ghost' (em superfície clara).
  function FavButton({ id, variant = "overlay", size = 36, onChange }) {
    const { has, toggle } = useFavorites();
    const active = has(id);
    const [pulse, setPulse] = useState(false);

    const handle = (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggle(id);
      if (!active) { setPulse(true); setTimeout(() => setPulse(false), 320); }
      onChange?.(!active);
    };

    const styles = variant === "overlay"
      ? { background: "rgba(0,0,0,.42)", color: "#fff", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }
      : { background: "var(--rbk-surface)", color: "var(--rbk-ink)" };

    return (
      <button onClick={handle} aria-label={active ? "Remover dos favoritos" : "Favoritar"} style={{
        width: size, height: size, borderRadius: size / 2, border: 0, cursor: "pointer",
        display: "grid", placeItems: "center", padding: 0,
        transition: "transform .18s ease",
        transform: pulse ? "scale(1.18)" : "scale(1)",
        ...styles,
      }}>
        <iconify-icon
          icon={active ? "ph:heart-fill" : "ph:heart"}
          width={Math.round(size * 0.52)}
          style={{ color: active ? "var(--rbk-plum)" : "currentColor", transition: "color .18s ease" }}
        ></iconify-icon>
      </button>
    );
  }

  Object.assign(window, { useFavorites, FavButton, rbkReadFavs: read });
})();
