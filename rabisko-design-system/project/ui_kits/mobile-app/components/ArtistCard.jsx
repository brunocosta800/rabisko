// ArtistCard.jsx — the black hero card with rating, name, style tags and cream footer.

function ArtistCard({ id, photo, name, rating, tags = [], onClick }) {
  const FavButton = window.FavButton;
  return (
    <button onClick={onClick} style={{
      border: 0, padding: 0, background: "transparent", textAlign: "left",
      width: "100%", cursor: "pointer", borderRadius: "var(--rbk-r-lg)", overflow: "hidden",
      display: "block",
    }}>
      <div style={{ position: "relative", background: "var(--rbk-ink)", color: "#fff", padding: "18px 22px 22px" }}>
        {FavButton && id != null && (
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <FavButton id={id} size={32} />
          </div>
        )}
        <div style={{ position: "absolute", top: 16, right: 18, display: "flex", alignItems: "center", gap: 6, font: "var(--t-body)" }}>
          {rating} <iconify-icon icon="ic:round-star" width="16" />
        </div>
        <div style={{
          width: 96, height: 96, borderRadius: 16, margin: "8px auto 12px",
          background: photo ? `url(${photo}) center/cover` : "var(--rbk-surface)",
        }} />
        <div style={{ textAlign: "center", font: "600 18px/1.1 var(--font-body)" }}>{name}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <span key={t} style={{
              border: "1px solid #fff", borderRadius: 999, padding: "4px 12px",
              font: "500 11px/1 var(--font-body)",
            }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ background: "var(--rbk-surface)", textAlign: "center", padding: "10px 0", font: "var(--t-body)" }}>
        ver mais...
      </div>
    </button>
  );
}

window.ArtistCard = ArtistCard;
