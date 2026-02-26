import { useState } from "react";
import { t, sans, mono, cardBase, inputBase } from "./theme.js";
import { I } from "./icons.jsx";

export function Badge({ children, variant = "success" }) {
  const styles = {
    success: { bg: t.successBg, color: t.success, border: "1px solid #D1FAE5" },
    gold: { bg: t.goldBg, color: t.gold, border: `1px solid ${t.goldBorder}` },
    muted: { bg: t.bgWarm, color: t.textMuted, border: `1px solid ${t.border}` },
  };
  const s = styles[variant] || styles.success;
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 6, background: s.bg, color: s.color, border: s.border, fontSize: 12, fontWeight: 600, fontFamily: sans }}>{children}</span>;
}

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      {eyebrow && <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, background: t.accentLight, color: t.accent, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14, fontFamily: sans }}>{eyebrow}</span>}
      <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 10, letterSpacing: "-0.3px" }}>{title}</h2>
      {subtitle && <p style={{ color: t.textMuted, fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.65, fontFamily: sans }}>{subtitle}</p>}
    </div>
  );
}

export function Skeleton({ w = "100%", h = 18 }) {
  return <div style={{ width: w, height: h, borderRadius: 8, background: `linear-gradient(90deg, ${t.bgWarm} 25%, ${t.border} 50%, ${t.bgWarm} 75%)`, backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />;
}

export function MiniChart({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 110, padding: "0 4px" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: t.textMuted, fontFamily: mono }}>{(v / 1000000).toFixed(1)}M</span>
          <div style={{ width: "100%", height: `${(v / max) * 100}%`, minHeight: 8, borderRadius: "8px 8px 4px 4px", background: `linear-gradient(180deg, ${t.accent} 0%, ${t.accent}88 100%)`, transition: "height 0.6s ease" }} />
          <span style={{ fontSize: 12, color: t.textDim, fontFamily: sans }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function AuthModal({ mode, setMode, onLogin, onClose }) {
  const [email, setEmail] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(27,42,74,0.3)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div style={{ ...cardBase, width: "100%", maxWidth: 400, padding: 32, boxShadow: t.shadowLg, animation: "fadeUp 0.3s ease" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700 }}>{mode === "login" ? "Bentornato" : "Crea account"}</h3>
          <button onClick={onClose} style={{ border: "none", background: "transparent", color: t.textMuted, cursor: "pointer", padding: 4 }}><I.Close /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: sans }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: t.textMuted, marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@azienda.it" style={inputBase} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: t.textMuted, marginBottom: 6 }}>Password</label>
            <input type="password" placeholder="••••••••" style={inputBase} />
          </div>
          <button onClick={() => onLogin(email || "utente@demo.it")} style={{ border: "none", background: t.bgNavy, color: "#fff", padding: "13px 24px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: sans, marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {mode === "login" ? "Accedi" : "Registrati"} <I.ArrowRight />
          </button>
          <p style={{ textAlign: "center", fontSize: 13, color: t.textMuted }}>
            {mode === "login" ? "Non hai un account? " : "Hai già un account? "}
            <span onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ color: t.accent, cursor: "pointer", fontWeight: 600 }}>{mode === "login" ? "Registrati" : "Accedi"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
