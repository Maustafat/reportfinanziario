import { useState } from "react";
import { t, sans, mono, cardBase, fmt } from "./theme.js";
import { I } from "./icons.jsx";
import { SectionHeader } from "./components.jsx";
import { REPORT_TYPES, TESTIMONIALS, TRUST_LOGOS } from "./data.js";

export function HomePage({ onSearch }) {
  const [q, setQ] = useState("");

  const features = [
    { icon: <I.Shield />, title: "Dati Certificatix", desc: "Informazioni ufficiali direttamente dal Registro Imprese, aggiornate in tempo reale tramite API InfoCamere.", color: t.accent },
    { icon: <I.Zap />, title: "Consegna Istantanea", desc: "Report generati e pronti per il download in meno di 30 secondi. Nessuna attesa, nessun processo manuale.", color: t.teal },
    { icon: <I.Globe />, title: "6 Milioni di Aziende", desc: "Copertura completa di tutte le imprese registrate in Italia, dalla ditta individuale alla S.p.A.", color: t.gold },
  ];

  const heroBlobs = `
    @keyframes floatA { 0%,100%{ transform: translate(0,0) scale(1) rotate(0deg); } 73%{ transform: translate(60px,-40px) scale(1.1) rotate(120deg); } 66%{ transform: translate(-30px,50px) scale(0.95) rotate(240deg); } }
    @keyframes floatB { 0%,100%{ transform: translate(0,0) scale(1) rotate(0deg); } 73%{ transform: translate(-50px,60px) scale(1.08) rotate(-120deg); } 66%{ transform: translate(40px,-30px) scale(0.92) rotate(-240deg); } }
    @keyframes floatC { 0%,100%{ transform: translate(0,0) scale(1); } 90%{ transform: translate(30px,40px) scale(1.15); } }
    @keyframes pulse { 0%,100%{ opacity: 0.2; } 50%{ opacity: 0.2; } }
  `;

  return (
    <>
      <style>{heroBlobs}</style>
      {/* ─── HERO ─── */}
      <section style={{ position: "relative", padding: "88px 28px 72px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #F5F3EF 0%, #FAFAF8 60%, #FAFAF8 100%)", zIndex: 0 }} />

        {/* Animated blobs */}
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 340, height: 340, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", background: "radial-gradient(circle, rgba(43,108,176,0.07) 0%, rgba(43,108,176,0.02) 50%, transparent 70%)", filter: "blur(40px)", animation: "floatA 20s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "5%", right: "10%", width: 420, height: 420, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, rgba(13,148,136,0.02) 50%, transparent 70%)", filter: "blur(50px)", animation: "floatB 25s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "5%", left: "40%", width: 280, height: 280, borderRadius: "50% 60% 40% 70% / 60% 40% 60% 40%", background: "radial-gradient(circle, rgba(184,134,11,0.05) 0%, rgba(184,134,11,0.01) 50%, transparent 70%)", filter: "blur(35px)", animation: "floatC 18s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "30%", left: "50%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(43,108,176,0.05) 0%, transparent 70%)", filter: "blur(25px)", animation: "pulse 8s ease-in-out infinite, floatA 22s ease-in-out infinite reverse", zIndex: 0 }} />

        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 20, background: t.bgCard, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.success }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: t.textMuted, fontFamily: sans }}>Collegato al Registro Imprese in tempo reale</span>
          </div>

          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", height: "120%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(43,108,176,0.08) 0%, transparent 70%)", filter: "blur(30px)", animation: "pulse 6s ease-in-out infinite", zIndex: 0 }} />
            <h1 style={{ position: "relative", zIndex: 1, fontSize: "clamp(34px, 5.5vw, 56px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", marginBottom: 20, color: t.bgNavy }}>
              Conosci ogni azienda italiana,{" "}
              <span style={{ color: t.accent }}>prima di decidere</span>
            </h1>
          </div>

          <p style={{ fontSize: 17, color: t.textBody, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px", fontFamily: sans }}>
            Report aziendali con dati ufficiali: bilanci, esponenti, score creditizio. Tutto in un documento professionale, pronto in pochi secondi.
          </p>

          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ display: "flex", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden", boxShadow: t.shadowMd }}>
              <div style={{ padding: "0 16px", display: "flex", alignItems: "center", color: t.textDim }}><I.Search /></div>
              <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch(q)} placeholder="Nome azienda, P.IVA o città..." style={{ flex: 1, padding: "15px 0", border: "none", background: "transparent", color: t.text, fontSize: 15, fontFamily: sans, outline: "none" }} />
              <button onClick={() => onSearch(q)} style={{ border: "none", background: t.bgNavy, color: "#fff", padding: "10px 26px", margin: 6, borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: sans, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                Cerca <I.ArrowRight />
              </button>
            </div>
            <p style={{ marginTop: 14, fontSize: 13, color: t.textDim, fontFamily: sans }}>
              Prova:{" "}
              {["Milano", "software", "TechnoVerde"].map((term, i) => (
                <span key={term}>
                  {i > 0 && " · "}
                  <span onClick={() => { setQ(term); onSearch(term); }} style={{ color: t.accent, cursor: "pointer", fontWeight: 500, textDecoration: "underline", textDecorationColor: `${t.accent}44`, textUnderlineOffset: 3 }}>{term}</span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section style={{ padding: "0 28px", marginBottom: 72 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: t.textDim, fontFamily: sans, fontWeight: 600, marginBottom: 20 }}>Utilizzato da professionisti di</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
            {TRUST_LOGOS.map((name) => (
              <span key={name} style={{ fontSize: 15, fontWeight: 700, color: t.textDim, opacity: 0.5, fontFamily: sans, letterSpacing: "-0.3px" }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px 80px" }}>
        <SectionHeader eyebrow="Perché ReportIQ" title="Dati ufficiali, decisioni migliori" subtitle="Colleghiamo le banche dati del Registro Imprese per offrirti informazioni certificate, formattate e pronte all'uso." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} style={{ ...cardBase, padding: 28, boxShadow: t.shadow, animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = t.shadowMd; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = t.shadow; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: `${f.color}11`, border: `1px solid ${f.color}22`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, marginBottom: 18 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, fontFamily: sans }}>{f.title}</h3>
              <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.65, fontFamily: sans }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── REPORT TYPES ─── */}
      <section style={{ background: t.bgWarm, padding: "72px 28px", borderTop: `1px solid ${t.borderLight}`, borderBottom: `1px solid ${t.borderLight}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionHeader eyebrow="Piani" title="Scegli il livello di dettaglio" subtitle="Dal report base all'analisi completa con score creditizio. Nessun abbonamento: paghi solo ciò che ti serve." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {REPORT_TYPES.map((rt) => (
              <div key={rt.id} style={{ ...cardBase, padding: 28, boxShadow: t.shadow, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", ...(rt.popular && { border: `2px solid ${t.accent}`, boxShadow: t.shadowMd }) }}>
                {rt.popular && <div style={{ position: "absolute", top: 14, right: -24, background: t.accent, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 32px", transform: "rotate(45deg)", fontFamily: sans, letterSpacing: 0.5 }}>Popolare</div>}
                <div>
                  <span style={{ fontSize: 34, display: "block", marginBottom: 12 }}>{rt.icon}</span>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6, fontFamily: sans }}>{rt.name}</h3>
                  <div style={{ fontSize: 32, fontWeight: 700, fontFamily: mono, marginBottom: 20, color: t.bgNavy }}>
                    {fmt(rt.price)} <span style={{ fontSize: 13, fontWeight: 400, color: t.textDim, fontFamily: sans }}>/report</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                    {rt.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: t.textBody, fontFamily: sans }}>
                        <span style={{ color: t.success, marginTop: 2, flexShrink: 0 }}><I.Check /></span>{f}
                      </div>
                    ))}
                  </div>
                </div>
                <button style={{ border: rt.popular ? "none" : `1px solid ${t.border}`, background: rt.popular ? t.bgNavy : t.bgCard, color: rt.popular ? "#fff" : t.text, padding: "12px 20px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: sans, fontSize: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s" }}>
                  Cerca un'azienda <I.ArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "72px 28px" }}>
        <SectionHeader eyebrow="Testimonianze" title="Scelto da chi decide" subtitle="Professionisti di banche, fondi e studi legali si affidano a ReportIQ ogni giorno." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((tm, i) => (
            <div key={i} style={{ ...cardBase, padding: 28, boxShadow: t.shadow, position: "relative", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
              <div style={{ position: "absolute", top: 20, right: 24 }}><I.Quote /></div>
              <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>{[...Array(5)].map((_, j) => <I.Star key={j} />)}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textBody, fontStyle: "italic", marginBottom: 20 }}>"{tm.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: `1px solid ${t.borderLight}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: t.bgNavy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, fontFamily: sans }}>{tm.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, fontFamily: sans }}>{tm.name}</div>
                  <div style={{ fontSize: 12, color: t.textMuted, fontFamily: sans }}>{tm.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px 40px" }}>
        <div style={{ ...cardBase, background: t.bgNavy, border: "none", textAlign: "center", padding: "56px 40px", borderRadius: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.3px" }}>Pronto a conoscere la tua prossima azienda?</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, fontFamily: sans, maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.6 }}>Inizia con una ricerca gratuita. Nessuna carta di credito richiesta per esplorare il database.</p>
            <button onClick={() => onSearch("")} style={{ border: "none", background: "#fff", color: t.bgNavy, padding: "14px 36px", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontFamily: sans, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Cerca un'azienda <I.ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
