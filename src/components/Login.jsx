import { useState } from 'react'
import { isValidEmail } from '../validators'

function Login({ users, onLogin, goRegister, message }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required'
    else if (!isValidEmail(email)) errs.email = 'Enter a valid email address'
    if (!password) errs.password = 'Password is required'
    setErrors(errs)
    setFormError('')
    if (Object.keys(errs).length > 0) return

    const user = users.find((u) => u.email === email.trim().toLowerCase())
    if (!user) return setFormError('No account found with this email. Please register first.')
    if (user.password !== password) return setFormError('Incorrect password. Please try again.')
    onLogin(user.email)
  }

  return (
    <div className="login-wrap d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ width: 400 }}>
        <div className="text-center mb-3">
          <i className="bi bi-capsule-pill text-success" style={{ fontSize: 48 }}></i>
          <h3 className="mb-0">Nithin Pharmacy</h3>
          <small className="text-muted">Login to continue</small>
        </div>
        {message && <div className="alert alert-success py-2">{message}</div>}
        {formError && <div className="alert alert-danger py-2">{formError}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className={'form-control ' + (errors.email ? 'is-invalid' : '')}
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className={'form-control ' + (errors.password ? 'is-invalid' : '')}
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <button className="btn btn-success w-100">Login</button>
        </form>
        <p className="text-center mt-3 mb-0">
          New staff? <a href="#" onClick={(e) => { e.preventDefault(); goRegister() }}>Create an account</a>
        </p>
      </div>
    </div>
  )
}

export default Login
