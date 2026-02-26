// ─── THEME & SHARED STYLES ──────────────────────────────────────────
export const t = {
  bg: "#FAFAF8",
  bgWarm: "#F5F3EF",
  bgCard: "#FFFFFF",
  bgCardAlt: "#F9F8F6",
  bgNavy: "#1B2A4A",
  bgNavyLight: "#243558",
  border: "#E8E5DF",
  borderLight: "#F0EDE8",
  text: "#1B2A4A",
  textBody: "#3D4A5C",
  textMuted: "#7A8494",
  textDim: "#A0A8B4",
  accent: "#2B6CB0",
  accentHover: "#2558A0",
  accentLight: "#EBF2FA",
  accentSoft: "rgba(43,108,176,0.08)",
  teal: "#0D9488",
  tealBg: "#F0FDFA",
  gold: "#B8860B",
  goldBg: "#FFFBEB",
  goldBorder: "#FDE68A",
  success: "#059669",
  successBg: "#ECFDF5",
  error: "#DC2626",
  shadow: "0 1px 3px rgba(27,42,74,0.04), 0 4px 12px rgba(27,42,74,0.06)",
  shadowMd: "0 2px 8px rgba(27,42,74,0.05), 0 8px 24px rgba(27,42,74,0.08)",
  shadowLg: "0 4px 12px rgba(27,42,74,0.04), 0 16px 48px rgba(27,42,74,0.1)",
};

export const sans = "'Outfit', sans-serif";
export const mono = "'JetBrains Mono', monospace";
export const cardBase = { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, transition: "all 0.25s ease" };
export const inputBase = { width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.bgCard, color: t.text, fontSize: 14, fontFamily: sans, transition: "border-color 0.2s" };

export const fmt = (n) => new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);
export const fmtNum = (n) => new Intl.NumberFormat("it-IT").format(n);
export const delay = (ms) => new Promise((r) => setTimeout(r, ms));
