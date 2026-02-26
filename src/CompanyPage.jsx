import { t, sans, mono, cardBase, fmt, fmtNum } from "./theme.js";
import { I } from "./icons.jsx";
import { Badge, SectionHeader, MiniChart } from "./components.jsx";
import { REPORT_TYPES } from "./data.js";

export function CompanyPage({ company: c, onAddToCart, onBack }) {
  const growth = (((c.revenue2023 - c.revenue2022) / c.revenue2022) * 100).toFixed(1);
  const margin = ((c.ebitda2023 / c.revenue2023) * 100).toFixed(1);

  return (
    <section style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 28px 60px" }}>
      <button onClick={onBack} style={{ border: "none", background: "transparent", color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontFamily: sans, fontWeight: 500, marginBottom: 20, padding: "6px 0" }}>
        <I.ArrowLeft /> Torna ai risultati
      </button>

      {/* HEADER CARD */}
      <div style={{ ...cardBase, boxShadow: t.shadow, marginBottom: 20, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontSize: 26, fontWeight: 700, fontFamily: sans }}>{c.name}</h1>
              <Badge>{c.status}</Badge>
            </div>
            <p style={{ color: t.textMuted, fontSize: 14, fontFamily: sans }}>{c.atecoDesc} · ATECO {c.ateco}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: t.textDim, fontFamily: sans, marginBottom: 4 }}>Fatturato 2023</div>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: mono, color: t.success }}>{fmt(c.revenue2023)}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, padding: "20px 0", borderTop: `1px solid ${t.borderLight}`, borderBottom: `1px solid ${t.borderLight}`, marginBottom: 16 }}>
          {[
            { l: "Forma Giuridica", v: c.legalForm },
            { l: "P.IVA / C.F.", v: c.piva },
            { l: "Sede Legale", v: c.address },
            { l: "PEC", v: c.pec },
            { l: "Data Iscrizione", v: new Date(c.regDate).toLocaleDateString("it-IT") },
            { l: "Capitale Sociale", v: fmt(c.capital) },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: t.textDim, fontFamily: sans, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{item.l}</div>
              <div style={{ fontSize: 14, fontWeight: 500, fontFamily: sans }}>{item.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: t.accent, fontSize: 13, fontFamily: sans, fontWeight: 500 }}>
          <I.Eye /> Anteprima gratuita — acquista un report per dati completi
        </div>
      </div>

      {/* STAT CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Fatturato 2023", value: fmt(c.revenue2023), sub: `+${growth}% YoY`, icon: <I.TrendUp />, color: t.success },
          { label: "EBITDA 2023", value: fmt(c.ebitda2023), sub: `Margine ${margin}%`, icon: <I.TrendUp />, color: t.teal },
          { label: "Dipendenti", value: fmtNum(c.employees), icon: <I.User />, color: t.accent },
        ].map((s, i) => (
          <div key={i} style={{ ...cardBase, boxShadow: t.shadow, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: t.textDim, fontFamily: sans, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</span>
              <span style={{ color: t.textDim }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: mono, marginBottom: 4 }}>{s.value}</div>
            {s.sub && <span style={{ fontSize: 12, color: s.color, fontFamily: sans, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><I.TrendUp /> {s.sub}</span>}
          </div>
        ))}
      </div>

      {/* CHART */}
      <div style={{ ...cardBase, boxShadow: t.shadow, marginBottom: 24, padding: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, fontFamily: sans }}>Andamento Fatturato</h3>
        <MiniChart data={[c.revenue2021, c.revenue2022, c.revenue2023]} labels={["2021", "2022", "2023"]} />
      </div>

      {/* LOCKED SECTION */}
      <div style={{ ...cardBase, boxShadow: t.shadow, position: "relative", overflow: "hidden", marginBottom: 32, padding: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, fontFamily: sans }}>Analisi Avanzata</h3>
        <div style={{ filter: "blur(5px)", pointerEvents: "none", userSelect: "none" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
            {[["Indice Liquidità", "1.82"], ["ROE", "18.4%"], ["Score Creditizio", "A+"]].map(([l, v]) => (
              <div key={l} style={{ padding: 16, background: t.bgWarm, borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: t.textDim, fontFamily: sans }}>{l}</div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: mono }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,250,248,0.6)", backdropFilter: "blur(2px)" }}>
          <div style={{ textAlign: "center", fontFamily: sans }}>
            <I.Lock />
            <p style={{ fontSize: 14, fontWeight: 600, marginTop: 8, color: t.text }}>Disponibile con Report Finanziario o Completo</p>
          </div>
        </div>
      </div>

      {/* BUY REPORTS */}
      <SectionHeader title="Acquista un Report" subtitle={`Scegli il livello di dettaglio per ${c.name}`} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {REPORT_TYPES.map((rt) => (
          <div key={rt.id} style={{ ...cardBase, boxShadow: t.shadow, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24, ...(rt.popular && { border: `2px solid ${t.accent}` }) }}>
            <div>
              <span style={{ fontSize: 30, display: "block", marginBottom: 10 }}>{rt.icon}</span>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, fontFamily: sans }}>{rt.name}</h3>
              <div style={{ fontSize: 26, fontWeight: 700, fontFamily: mono, marginBottom: 16, color: t.bgNavy }}>{fmt(rt.price)}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {rt.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: t.textBody, fontFamily: sans }}>
                    <span style={{ color: t.success, marginTop: 1, flexShrink: 0 }}><I.Check /></span>{f}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => onAddToCart(c, rt)} style={{ border: rt.popular ? "none" : `1px solid ${t.border}`, background: rt.popular ? t.bgNavy : t.bgCard, color: rt.popular ? "#fff" : t.text, padding: "12px 20px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: sans, fontSize: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <I.Cart /> Aggiungi al carrello
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
