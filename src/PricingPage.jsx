import { t, sans, mono, cardBase, fmt } from "./theme.js";
import { I } from "./icons.jsx";
import { Badge, SectionHeader } from "./components.jsx";
import { REPORT_TYPES } from "./data.js";

export function PricingPage() {
  return (
    <section style={{ maxWidth: 1140, margin: "0 auto", padding: "52px 28px 60px" }}>
      <SectionHeader eyebrow="Prezzi trasparenti" title="Paga solo ciò che ti serve" subtitle="Nessun abbonamento obbligatorio. Acquista report singoli o scegli un piano volume per risparmiare." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 48 }}>
        {REPORT_TYPES.map((rt) => (
          <div key={rt.id} style={{ ...cardBase, boxShadow: t.shadow, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", ...(rt.popular && { border: `2px solid ${t.accent}`, boxShadow: t.shadowMd }) }}>
            <div>
              <span style={{ fontSize: 36, display: "block", marginBottom: 12 }}>{rt.icon}</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, fontFamily: sans }}>{rt.name}</h3>
              {rt.popular && <Badge variant="gold">Più popolare</Badge>}
              <div style={{ fontSize: 34, fontWeight: 700, fontFamily: mono, margin: "14px 0 22px", color: t.bgNavy }}>
                {fmt(rt.price)} <span style={{ fontSize: 14, fontWeight: 400, color: t.textDim, fontFamily: sans }}>/report</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {rt.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: t.textBody, fontFamily: sans }}>
                    <span style={{ color: t.success, marginTop: 2, flexShrink: 0 }}><I.Check /></span>{f}
                  </div>
                ))}
              </div>
            </div>
            <button style={{ border: rt.popular ? "none" : `1px solid ${t.border}`, background: rt.popular ? t.bgNavy : t.bgCard, color: rt.popular ? "#fff" : t.text, padding: "13px 20px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: sans, fontSize: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              Cerca un'azienda <I.ArrowRight />
            </button>
          </div>
        ))}
      </div>

      <div style={{ ...cardBase, background: t.bgNavy, border: "none", textAlign: "center", padding: "48px 32px", borderRadius: 18 }}>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 10, fontFamily: sans }}>Piani Volume per Aziende</h3>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 460, margin: "0 auto 24px", lineHeight: 1.6, fontSize: 15, fontFamily: sans }}>
          Più di 50 report al mese? Offriamo piani personalizzati con sconti fino al 60% e assistenza dedicata.
        </p>
        <button style={{ border: "none", background: "#fff", color: t.bgNavy, padding: "13px 30px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: sans, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
          Contattaci <I.ArrowRight />
        </button>
      </div>
    </section>
  );
}
