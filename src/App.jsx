import { useState, useCallback } from "react";
import { t, sans, mono, delay } from "./theme.js";
import { I } from "./icons.jsx";
import { AuthModal } from "./components.jsx";
import { MOCK_COMPANIES } from "./data.js";
import { HomePage } from "./HomePage.jsx";
import { SearchPage } from "./SearchPage.jsx";
import { CompanyPage } from "./CompanyPage.jsx";
import { PricingPage } from "./PricingPage.jsx";
import { CartPage } from "./CartPage.jsx";
import { DashboardPage } from "./DashboardPage.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [notification, setNotification] = useState(null);

  const notify = useCallback((msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const searchCompanies = useCallback(async (q) => {
    if (!q.trim()) return;
    setIsSearching(true);
    setPage("search");
    await delay(700);
    const results = MOCK_COMPANIES.filter(
      (c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.cf.includes(q) || c.piva.includes(q) || c.city.toLowerCase().includes(q.toLowerCase()) || c.atecoDesc.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(results.length ? results : MOCK_COMPANIES.slice(0, 4));
    setIsSearching(false);
  }, []);

  const addToCart = useCallback((company, reportType) => {
    const item = { id: `${company.id}-${reportType.id}`, company, reportType, addedAt: new Date() };
    setCart((prev) => { if (prev.find((i) => i.id === item.id)) return prev; return [...prev, item]; });
    notify(`${reportType.name} per ${company.name} aggiunto al carrello`);
  }, [notify]);

  const removeFromCart = useCallback((itemId) => { setCart((prev) => prev.filter((i) => i.id !== itemId)); }, []);

  const checkout = useCallback(async () => {
    if (!user) { setShowAuth(true); return; }
    const newOrder = { id: `ORD-${Date.now()}`, items: [...cart], total: cart.reduce((s, i) => s + i.reportType.price, 0), date: new Date(), status: "completed" };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setPage("dashboard");
    notify("Ordine completato! I report sono pronti per il download.");
  }, [user, cart, notify]);

  const login = useCallback((email) => { setUser({ email, name: email.split("@")[0] }); setShowAuth(false); notify("Bentornato!"); }, [notify]);

  const cartTotal = cart.reduce((s, i) => s + i.reportType.price, 0);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Source Serif 4', 'Georgia', serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* ─── NAV ─── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setPage("home"); setSelectedCompany(null); }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: t.bgNavy, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: mono, letterSpacing: "-1px" }}>Rq</div>
            <span style={{ fontWeight: 700, fontSize: 19, fontFamily: sans, letterSpacing: "-0.4px", color: t.bgNavy }}>ReportIQ</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[
              { label: "Home", p: "home" },
              { label: "Cerca", p: "search" },
              { label: "Prezzi", p: "pricing" },
              ...(user ? [{ label: "Dashboard", p: "dashboard" }] : []),
            ].map((item) => (
              <button key={item.p} onClick={() => setPage(item.p)} style={{ border: "none", background: page === item.p ? t.accentSoft : "transparent", color: page === item.p ? t.accent : t.textMuted, padding: "7px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: sans, transition: "all 0.2s" }}>
                {item.label}
              </button>
            ))}
            {cart.length > 0 && (
              <button onClick={() => setPage("cart")} style={{ position: "relative", border: "none", background: "transparent", color: t.textMuted, padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <I.Cart />
                <span style={{ position: "absolute", top: 1, right: 4, width: 17, height: 17, borderRadius: "50%", background: t.accent, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans }}>{cart.length}</span>
              </button>
            )}
            <div style={{ width: 1, height: 20, background: t.border, margin: "0 8px" }} />
            {user ? (
              <button onClick={() => setPage("dashboard")} style={{ border: `1px solid ${t.border}`, background: t.bgCard, color: t.text, padding: "7px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: sans, display: "flex", alignItems: "center", gap: 6, boxShadow: t.shadow }}>
                <I.User /> {user.name}
              </button>
            ) : (
              <button onClick={() => setShowAuth(true)} style={{ border: "none", background: t.bgNavy, color: "#fff", padding: "8px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                Accedi
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ─── NOTIFICATION ─── */}
      {notification && (
        <div style={{ position: "fixed", top: 76, right: 28, zIndex: 200, padding: "13px 22px", borderRadius: 10, background: t.bgCard, color: t.text, fontSize: 14, fontWeight: 500, fontFamily: sans, boxShadow: t.shadowLg, border: `1px solid ${t.border}`, animation: "slideIn 0.3s ease", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.success }} /> {notification.msg}
        </div>
      )}

      {showAuth && <AuthModal mode={authMode} setMode={setAuthMode} onLogin={login} onClose={() => setShowAuth(false)} />}

      {/* ─── PAGES ─── */}
      <main>
        {page === "home" && <HomePage onSearch={(q) => { setSearchQuery(q); searchCompanies(q); }} />}
        {page === "search" && <SearchPage query={searchQuery} setQuery={setSearchQuery} results={searchResults} isSearching={isSearching} onSearch={searchCompanies} onSelect={(c) => { setSelectedCompany(c); setPage("company"); }} />}
        {page === "company" && selectedCompany && <CompanyPage company={selectedCompany} onAddToCart={addToCart} onBack={() => setPage("search")} />}
        {page === "pricing" && <PricingPage />}
        {page === "cart" && <CartPage cart={cart} total={cartTotal} onRemove={removeFromCart} onCheckout={checkout} user={user} onAuthRequired={() => setShowAuth(true)} />}
        {page === "dashboard" && user && <DashboardPage user={user} orders={orders} onLogout={() => { setUser(null); setPage("home"); }} />}
      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: t.bgNavy, color: "rgba(255,255,255,0.7)", padding: "56px 28px 32px", marginTop: 96 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, marginBottom: 40, fontFamily: sans }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: mono }}>Rq</div>
              <span style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>ReportIQ</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>Dati aziendali certificati dal Registro Imprese. La fonte più affidabile per le tue decisioni di business.</p>
          </div>
          {[
            { title: "Prodotti", links: ["Report Base", "Report Finanziario", "Report Completo", "Piani Volume"] },
            { title: "Risorse", links: ["Centro Assistenza", "Guide", "Blog", "Stato Sistema"] },
            { title: "Legale", links: ["Privacy Policy", "Termini di Servizio", "Cookie Policy", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 16, color: "rgba(255,255,255,0.4)" }}>{col.title}</h4>
              {col.links.map((l) => <p key={l} style={{ fontSize: 13, marginBottom: 10, cursor: "pointer" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1140, margin: "0 auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: sans }}>
          <span>© 2026 ReportIQ — Tutti i diritti riservati</span>
          <span>Dati ufficiali · Registro Imprese — InfoCamere</span>
        </div>
      </footer>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: 2px solid ${t.accent}; outline-offset: 1px; }
        button:focus-visible { outline: 2px solid ${t.accent}; outline-offset: 2px; }
        ::selection { background: ${t.accent}; color: #fff; }
      `}</style>
    </div>
  );
}
