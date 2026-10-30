import { LOW_STOCK, today, daysLeft } from '../data'

function Dashboard({ medicines, sales, user }) {
  const lowStock = medicines.filter((m) => m.stock < LOW_STOCK)
  const expiring = medicines.filter((m) => daysLeft(m.expiry) <= 60)
  const todaySales = sales.filter((s) => s.date === today())
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0)

  const cards = [
    { title: 'Total Medicines', value: medicines.length, color: '#0b6e4f', icon: 'bi-capsule' },
    { title: 'Low Stock', value: lowStock.length, color: '#f59f00', icon: 'bi-exclamation-triangle' },
    { title: 'Expiring / Expired', value: expiring.length, color: '#e03131', icon: 'bi-calendar-x' },
    { title: "Today's Sales", value: '₹' + todayTotal, color: '#1c7ed6', icon: 'bi-currency-rupee' },
  ]

  return (
    <div>
      <h3 className="mb-1">Dashboard</h3>
      <p className="text-muted">Hello {user.name}, here is today&apos;s summary.</p>

      <div className="row g-3 mb-4">
        {cards.map((c) => (
          <div className="col-md-3" key={c.title}>
            <div className="card stat-card" style={{ borderLeftColor: c.color }}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">{c.title}</div>
                  <h3 className="mb-0">{c.value}</h3>
                </div>
                <i className={'bi ' + c.icon} style={{ fontSize: 32, color: c.color }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-white fw-bold">Low Stock Medicines</div>
            <table className="table table-sm mb-0">
              <thead><tr><th>Medicine</th><th>Stock</th></tr></thead>
              <tbody>
                {lowStock.map((m) => (
                  <tr key={m.id}><td>{m.name}</td><td><span className="badge bg-warning text-dark">{m.stock}</span></td></tr>
                ))}
                {lowStock.length === 0 && <tr><td colSpan="2" className="text-center text-muted">All good</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-white fw-bold">Expiry Alerts (within 60 days)</div>
            <table className="table table-sm mb-0">
              <thead><tr><th>Medicine</th><th>Expiry</th><th>Status</th></tr></thead>
              <tbody>
                {expiring.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.expiry}</td>
                    <td>
                      {daysLeft(m.expiry) < 0
                        ? <span className="badge bg-danger">Expired</span>
                        : <span className="badge bg-warning text-dark">{daysLeft(m.expiry)} days left</span>}
                    </td>
                  </tr>
                ))}
                {expiring.length === 0 && <tr><td colSpan="3" className="text-center text-muted">Nothing expiring</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
