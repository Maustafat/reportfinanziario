import { t, sans, mono, cardBase, inputBase, fmt } from "./theme.js";
import { I } from "./icons.jsx";

export function CartPage({ cart, total, onRemove, onCheckout, user, onAuthRequired }) {
  if (cart.length === 0) {
    return (
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "80px 28px", textAlign: "center" }}>
        <span style={{ fontSize: 44, display: "block", marginBottom: 14 }}>🛒</span>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, fontFamily: sans }}>Il carrello è vuoto</h2>
        <p style={{ color: t.textMuted, fontFamily: sans }}>Cerca un'azienda e aggiungi un report per iniziare.</p>
      </section>
    );
  }
  return (
    <section style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 28px 60px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 28, fontFamily: sans }}>Carrello ({cart.length})</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {cart.map((item) => (
            <div key={item.id} style={{ ...cardBase, boxShadow: t.shadow, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 30 }}>{item.reportType.icon}</span>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 3, fontFamily: sans }}>{item.reportType.name}</h4>
                  <p style={{ fontSize: 13, color: t.textMuted, fontFamily: sans }}>{item.company.name} — P.IVA {item.company.piva}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 16, fontWeight: 700, fontFamily: mono }}>{fmt(item.reportType.price)}</span>
                <button onClick={() => onRemove(item.id)} style={{ border: "none", background: "transparent", color: t.error, cursor: "pointer", padding: 4 }}><I.Close /></button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...cardBase, boxShadow: t.shadowMd, position: "sticky", top: 80, padding: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18, fontFamily: sans }}>Riepilogo</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 16, borderBottom: `1px solid ${t.borderLight}`, marginBottom: 16 }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: t.textMuted, fontFamily: sans }}>
                <span>{item.reportType.name}</span><span>{fmt(item.reportType.price)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, marginBottom: 22, fontFamily: sans }}>
            <span>Totale</span><span style={{ fontFamily: mono }}>{fmt(total)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18, fontFamily: sans }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: t.textDim, marginBottom: 4 }}>Numero Carta</label>
              <div style={{ ...inputBase, display: "flex", alignItems: "center", gap: 8 }}><I.CreditCard /> <span style={{ color: t.textDim }}>4242 •••• •••• ••••</span></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div><label style={{ display: "block", fontSize: 12, color: t.textDim, marginBottom: 4 }}>Scadenza</label><input placeholder="MM/AA" style={inputBase} /></div>
              <div><label style={{ display: "block", fontSize: 12, color: t.textDim, marginBottom: 4 }}>CVC</label><input placeholder="•••" style={inputBase} /></div>
            </div>
          </div>
          <button onClick={user ? onCheckout : onAuthRequired} style={{ border: "none", background: t.bgNavy, color: "#fff", padding: "13px 20px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: sans, fontSize: 15, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {user ? "Completa Acquisto" : "Accedi per acquistare"} <I.Lock />
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: t.textDim, marginTop: 12, fontFamily: sans, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <I.Shield /> Pagamento sicuro con Stripe
          </p>
        </div>
      </div>
    </section>
  );
}
