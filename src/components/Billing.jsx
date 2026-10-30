import { useState } from 'react'
import { shop } from '../shop'
import { GST_RATE, today, daysLeft } from '../data'

function Billing({ medicines, setMedicines, sales, setSales, user }) {
  const [customer, setCustomer] = useState('')
  const [phone, setPhone] = useState('')
  const [payment, setPayment] = useState('Cash')
  const [selectedId, setSelectedId] = useState('')
  const [qty, setQty] = useState(1)
  const [cart, setCart] = useState([])
  const [invoice, setInvoice] = useState(null)
  const [error, setError] = useState('')

  // only medicines that are in stock and not expired can be sold
  const available = medicines.filter((m) => m.stock > 0 && daysLeft(m.expiry) >= 0)

  const addToCart = () => {
    setError('')
    const med = medicines.find((m) => m.id === Number(selectedId))
    if (!med) return setError('Please select a medicine')
    if (!Number.isInteger(Number(qty)) || Number(qty) < 1) return setError('Quantity must be a whole number of at least 1')
    const already = cart.find((c) => c.id === med.id)
    const totalQty = (already ? already.qty : 0) + Number(qty)
    if (totalQty > med.stock) return setError('Only ' + med.stock + ' in stock for ' + med.name)
    if (already) setCart(cart.map((c) => (c.id === med.id ? { ...c, qty: totalQty } : c)))
    else setCart([...cart, { id: med.id, name: med.name, price: med.price, qty: Number(qty) }])
    setSelectedId('')
    setQty(1)
  }

  const removeItem = (id) => setCart(cart.filter((c) => c.id !== id))

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
  const gst = Math.round((subtotal * GST_RATE) / 100)
  const total = subtotal + gst

  const generateBill = () => {
    setError('')
    if (cart.length === 0) return setError('Cart is empty. Add at least one medicine.')
    if (customer.trim() && !/^[A-Za-z][A-Za-z .]{1,39}$/.test(customer.trim())) return setError('Customer name should contain letters only')
    const billNo = sales.length ? Math.max(...sales.map((s) => s.id)) + 1 : 1001
    const name = customer.trim() || 'Walk-in Customer'
    // reduce stock
    setMedicines(medicines.map((m) => {
      const item = cart.find((c) => c.id === m.id)
      return item ? { ...m, stock: m.stock - item.qty } : m
    }))
    setSales([...sales, { id: billNo, date: today(), customer: name, phone, payment, total, items: cart.length }])
    setInvoice({ billNo, billedBy: user.name, name, phone, payment, date: today(), cart, subtotal, gst, total, by: user.name })
    setCart([])
    setCustomer('')
    setPhone('')
    setPayment('Cash')
  }

  if (invoice) {
    return (
      <div>
        <div className="card mx-auto" style={{ maxWidth: 600 }}>
          <div className="card-body">
            <div className="text-center mb-3">
              <h4 className="mb-0">{shop.name}</h4>
              <div className="small text-muted">{shop.address}</div>
              <div className="small text-muted">Ph: {shop.phone}</div>
              <div className="small text-muted">{shop.dlNo} | {shop.gstin}</div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span><b>Bill No:</b> NP-{invoice.billNo}</span>
              <span><b>Date:</b> {invoice.date}</span>
            </div>
            <p className="mb-2"><b>Customer:</b> {invoice.name}{invoice.phone && ' (' + invoice.phone + ')'}<br /><b>Payment:</b> {invoice.payment}</p>
            <table className="table table-sm">
              <thead><tr><th>Medicine</th><th>Qty</th><th>Rate</th><th className="text-end">Amount</th></tr></thead>
              <tbody>
                {invoice.cart.map((c) => (
                  <tr key={c.id}><td>{c.name}</td><td>{c.qty}</td><td>₹{c.price}</td><td className="text-end">₹{c.price * c.qty}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="text-end">
              <div>Subtotal: ₹{invoice.subtotal}</div>
              <div>GST ({GST_RATE}%): ₹{invoice.gst}</div>
              <h5>Total: ₹{invoice.total}</h5>
            </div>
            <p className="text-center text-muted small mb-0">Billed by {invoice.by}. Medicines once sold cannot be returned. Get well soon.</p>
          </div>
        </div>
        <div className="text-center mt-3 no-print">
          <button className="btn btn-outline-success me-2" onClick={() => window.print()}><i className="bi bi-printer me-1"></i>Print</button>
          <button className="btn btn-success" onClick={() => setInvoice(null)}>New Bill</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-3">Billing</h3>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <div className="row g-3">
        <div className="col-md-5">
          <div className="card card-body">
            <label className="form-label">Customer Name</label>
            <input className="form-control mb-3" placeholder="Walk-in Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
            <label className="form-label">Phone (optional)</label>
            <input className="form-control mb-3" maxLength="10" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} />
            <label className="form-label">Payment Mode</label>
            <select className="form-select mb-3" value={payment} onChange={(e) => setPayment(e.target.value)}>
              <option>Cash</option><option>UPI</option><option>Card</option>
            </select>
            <label className="form-label">Medicine</label>
            <select className="form-select mb-3" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              <option value="">-- Select medicine --</option>
              {available.map((m) => <option key={m.id} value={m.id}>{m.name} (₹{m.price}, stock {m.stock})</option>)}
            </select>
            <label className="form-label">Quantity</label>
            <input type="number" min="1" className="form-control mb-3" value={qty} onChange={(e) => setQty(e.target.value)} />
            <button className="btn btn-success" onClick={addToCart}><i className="bi bi-cart-plus me-1"></i>Add to Cart</button>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card">
            <div className="card-header bg-white fw-bold">Cart</div>
            <table className="table mb-0 align-middle">
              <thead><tr><th>Medicine</th><th>Qty</th><th>Price</th><th>Amount</th><th></th></tr></thead>
              <tbody>
                {cart.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td><td>{c.qty}</td><td>₹{c.price}</td><td>₹{c.price * c.qty}</td>
                    <td><button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(c.id)}><i className="bi bi-x-lg"></i></button></td>
                  </tr>
                ))}
                {cart.length === 0 && <tr><td colSpan="5" className="text-center text-muted">No items added</td></tr>}
              </tbody>
            </table>
            <div className="card-body text-end">
              <div>Subtotal: ₹{subtotal}</div>
              <div>GST ({GST_RATE}%): ₹{gst}</div>
              <h5>Total: ₹{total}</h5>
              <button className="btn btn-primary" onClick={generateBill}><i className="bi bi-receipt me-1"></i>Generate Bill</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing
