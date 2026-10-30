import { useState } from 'react'
import { LOW_STOCK, today, daysLeft } from '../data'

const emptyForm = { name: '', category: 'Tablet', batch: '', price: '', stock: '', expiry: '' }

function Medicines({ medicines, setMedicines }) {
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const errs = {}
    const name = form.name.trim()
    const batch = form.batch.trim().toUpperCase()
    if (name.length < 2) errs.name = 'Enter medicine name'
    if (!/^[A-Z0-9-]{3,15}$/.test(batch)) errs.batch = 'Batch: 3-15 letters/numbers'
    else if (medicines.some((x) => x.id !== editId && x.name.toLowerCase() === name.toLowerCase() && x.batch === batch))
      errs.name = 'This medicine with the same batch already exists'
    if (!(Number(form.price) > 0)) errs.price = 'Price must be above 0'
    if (form.stock === '' || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) errs.stock = 'Enter whole number'
    if (!form.expiry) errs.expiry = 'Select expiry date'
    else if (!editId && form.expiry <= today()) errs.expiry = 'Expiry must be a future date'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    const data = { ...form, name: form.name.trim(), batch: form.batch.trim().toUpperCase(), price: Number(form.price), stock: Number(form.stock) }
    if (editId) {
      setMedicines(medicines.map((m) => (m.id === editId ? { ...data, id: editId } : m)))
    } else {
      setMedicines([...medicines, { ...data, id: Date.now() }])
    }
    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
  }

  const handleEdit = (m) => {
    setErrors({})
    setForm(m)
    setEditId(m.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this medicine?')) setMedicines(medicines.filter((m) => m.id !== id))
  }

  const filtered = medicines.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Medicines</h3>
        <button className="btn btn-success" onClick={() => { setErrors({}); setForm(emptyForm); setEditId(null); setShowForm(!showForm) }}>
          <i className="bi bi-plus-lg me-1"></i>{showForm ? 'Close' : 'Add Medicine'}
        </button>
      </div>

      {showForm && (
        <form className="card card-body mb-3" onSubmit={handleSubmit} noValidate>
          <h6>{editId ? 'Edit Medicine' : 'New Medicine'}</h6>
          <div className="row g-2">
            <div className="col-md-4"><input className={'form-control ' + (errors.name ? 'is-invalid' : '')} name="name" placeholder="Medicine name" value={form.name} onChange={handleChange} required /><div className="invalid-feedback">{errors.name}</div></div>
            <div className="col-md-2">
              <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Sachet'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-2"><input className={'form-control ' + (errors.batch ? 'is-invalid' : '')} name="batch" placeholder="Batch no." value={form.batch} onChange={handleChange} required /><div className="invalid-feedback">{errors.batch}</div></div>
            <div className="col-md-1"><input type="number" min="0" className={'form-control ' + (errors.price ? 'is-invalid' : '')} name="price" placeholder="₹" value={form.price} onChange={handleChange} required /><div className="invalid-feedback">{errors.price}</div></div>
            <div className="col-md-1"><input type="number" min="0" className={'form-control ' + (errors.stock ? 'is-invalid' : '')} name="stock" placeholder="Qty" step="1" value={form.stock} onChange={handleChange} required /><div className="invalid-feedback">{errors.stock}</div></div>
            <div className="col-md-2"><input type="date" className={'form-control ' + (errors.expiry ? 'is-invalid' : '')} name="expiry" value={form.expiry} onChange={handleChange} required /><div className="invalid-feedback">{errors.expiry}</div></div>
          </div>
          <div className="mt-3"><button className="btn btn-primary">{editId ? 'Update' : 'Save'}</button></div>
        </form>
      )}

      <input className="form-control mb-3" placeholder="Search medicine..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="card">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr><th>#</th><th>Name</th><th>Category</th><th>Batch</th><th>Price</th><th>Stock</th><th>Expiry</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td>{m.name}</td>
                <td>{m.category}</td>
                <td>{m.batch}</td>
                <td>₹{m.price}</td>
                <td>
                  <span className={'badge ' + (m.stock < LOW_STOCK ? 'bg-warning text-dark' : 'bg-success')}>{m.stock}</span>
                </td>
                <td className={daysLeft(m.expiry) < 0 ? 'text-danger fw-bold' : ''}>{m.expiry}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(m)}><i className="bi bi-pencil"></i></button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="8" className="text-center text-muted">No medicines found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Medicines
