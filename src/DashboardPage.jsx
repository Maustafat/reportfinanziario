import { t, sans, mono, cardBase, fmt } from "./theme.js";
import { I } from "./icons.jsx";
import { Badge } from "./components.jsx";

export function DashboardPage({ user, orders, onLogout }) {
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const totalReports = orders.reduce((s, o) => s + o.items.length, 0);
  return (
    <section style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 28px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4, fontFamily: sans }}>Ciao, {user.name}</h2>
          <p style={{ color: t.textMuted, fontFamily: sans, fontSize: 14 }}>{user.email}</p>
        </div>
        <button onClick={onLogout} style={{ border: `1px solid ${t.border}`, background: t.bgCard, color: t.textMuted, padding: "9px 18px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: sans, fontWeight: 500, boxShadow: t.shadow }}>Logout</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Report acquistati", value: totalReports, icon: <I.FileText /> },
          { label: "Totale speso", value: fmt(totalSpent), icon: <I.CreditCard /> },
          { label: "Ordini", value: orders.length, icon: <I.Cart /> },
        ].map((s, i) => (
          <div key={i} style={{ ...cardBase, boxShadow: t.shadow, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: t.textDim, fontFamily: sans, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</span>
              <span style={{ color: t.textDim }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: mono }}>{s.value}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 16, fontFamily: sans }}>I tuoi Report</h3>
      {orders.length === 0 ? (
        <div style={{ ...cardBase, boxShadow: t.shadow, textAlign: "center", padding: 48 }}>
          <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>📋</span>
          <p style={{ color: t.textMuted, fontFamily: sans }}>Nessun report acquistato.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {orders.map((order) => (
            <div key={order.id} style={{ ...cardBase, boxShadow: t.shadow }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: mono, fontSize: 12, color: t.textDim }}>{order.id}</span>
                  <span style={{ fontSize: 12, color: t.textDim, fontFamily: sans }}>{order.date.toLocaleDateString("it-IT")}</span>
                </div>
                <Badge>Completato</Badge>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {order.items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: t.bgWarm, borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{item.reportType.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, fontFamily: sans }}>{item.company.name}</div>
                        <div style={{ fontSize: 12, color: t.textMuted, fontFamily: sans }}>{item.reportType.name}</div>
                      </div>
                    </div>
                    <button style={{ border: "none", background: t.bgNavy, color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans, display: "flex", alignItems: "center", gap: 6 }}>
                      <I.Download /> Scarica PDF
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "right", marginTop: 12, fontSize: 15, fontWeight: 700, fontFamily: mono }}>Totale: {fmt(order.total)}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
