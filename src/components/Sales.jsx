function Sales({ sales }) {
  const grandTotal = sales.reduce((sum, s) => sum + s.total, 0)
  const recent = [...sales].reverse()

  return (
    <div>
      <h3 className="mb-3">Sales History</h3>
      <div className="card">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr><th>Bill No</th><th>Date</th><th>Customer</th><th>Payment</th><th>Items</th><th>Billed By</th><th className="text-end">Total</th></tr>
          </thead>
          <tbody>
            {recent.map((s) => (
              <tr key={s.id}>
                <td>NP-{s.id}</td><td>{s.date}</td><td>{s.customer}</td><td>{s.payment || '-'}</td><td>{s.items}</td><td>{s.billedBy}</td>
                <td className="text-end">₹{s.total}</td>
              </tr>
            ))}
            {recent.length === 0 && <tr><td colSpan="6" className="text-center text-muted">No sales yet</td></tr>}
            {recent.length === 0 && <tr><td colSpan="6" className="text-center text-muted">No bills generated yet</td></tr>}
          </tbody>
          <tfoot>
            <tr className="table-light"><th colSpan="5">Total Sales</th><th className="text-end">₹{grandTotal}</th></tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default Sales
