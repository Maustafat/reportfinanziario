import { t, sans, cardBase } from "./theme.js";
import { I } from "./icons.jsx";
import { Badge, Skeleton } from "./components.jsx";

export function SearchPage({ query, setQuery, results, isSearching, onSearch, onSelect }) {
  return (
    <section style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 28px 60px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto 36px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 18 }}>Cerca Aziende</h2>
        <div style={{ display: "flex", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden", boxShadow: t.shadow }}>
          <div style={{ padding: "0 14px", display: "flex", alignItems: "center", color: t.textDim }}><I.Search /></div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch(query)} placeholder="Nome, P.IVA, codice fiscale, città, settore..." style={{ flex: 1, padding: "13px 0", border: "none", background: "transparent", color: t.text, fontSize: 14, fontFamily: sans, outline: "none" }} />
          <button onClick={() => onSearch(query)} style={{ border: "none", background: t.bgNavy, color: "#fff", padding: "9px 22px", margin: 6, borderRadius: 8, fontWeight: 600, cursor: "pointer", fontFamily: sans, fontSize: 14 }}>Cerca</button>
        </div>
      </div>

      {isSearching ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[1, 2, 3].map((i) => <div key={i} style={{ ...cardBase, boxShadow: t.shadow, display: "flex", flexDirection: "column", gap: 12 }}><Skeleton w="40%" h={20} /><Skeleton w="65%" h={16} /><Skeleton w="28%" h={14} /></div>)}
        </div>
      ) : results.length > 0 ? (
        <>
          <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 16, fontFamily: sans }}>{results.length} risultati trovati</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map((c) => (
              <div key={c.id} onClick={() => onSelect(c)} style={{ ...cardBase, cursor: "pointer", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 16, boxShadow: t.shadow }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.boxShadow = t.shadowMd; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = t.shadow; }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: sans }}>{c.name}</h3>
                    <Badge>{c.status}</Badge>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 13, color: t.textMuted, fontFamily: sans }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><I.MapPin /> {c.city} ({c.province})</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><I.Building /> {c.legalForm}</span>
                    <span>P.IVA: {c.piva}</span>
                  </div>
                  <p style={{ fontSize: 13, color: t.textDim, marginTop: 6, fontFamily: sans }}>{c.atecoDesc} · ATECO {c.ateco}</p>
                </div>
                <div style={{ color: t.textDim }}><I.ArrowRight /></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: 64, color: t.textMuted, fontFamily: sans }}>
          <div style={{ marginBottom: 12, opacity: 0.4 }}><I.Search /></div>
          <p>Inserisci un termine di ricerca per trovare aziende</p>
        </div>
      )}
    </section>
  );
}
