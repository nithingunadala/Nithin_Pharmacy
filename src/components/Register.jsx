import { useState } from 'react'
import { isValidName, isValidEmail, isValidPhone, isStrongPassword } from '../validators'

function Register({ users, onRegister, goLogin }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const errs = {}
    if (!isValidName(form.name)) errs.name = 'Enter your full name (letters only, at least 3 characters)'
    if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address'
    else if (users.some((u) => u.email === form.email.trim().toLowerCase())) errs.email = 'This email is already registered'
    if (!isValidPhone(form.phone)) errs.phone = 'Enter a valid 10-digit mobile number'
    if (!isStrongPassword(form.password)) errs.password = 'Password must be at least 8 characters with a letter and a number'
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onRegister({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    })
  }

  const field = (name, label, type = 'text', extra = {}) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input type={type} name={name} value={form[name]} onChange={handleChange}
        className={'form-control ' + (errors[name] ? 'is-invalid' : '')} {...extra} />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  )

  return (
    <div className="login-wrap d-flex align-items-center justify-content-center py-4">
      <div className="card shadow p-4" style={{ width: 420 }}>
        <div className="text-center mb-3">
          <i className="bi bi-person-plus text-success" style={{ fontSize: 40 }}></i>
          <h4 className="mb-0">Create Account</h4>
          <small className="text-muted">Nithin Pharmacy staff registration</small>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {field('name', 'Full Name')}
          {field('email', 'Email', 'email')}
          {field('phone', 'Mobile Number', 'tel', { maxLength: 10 })}
          {field('password', 'Password', 'password')}
          {field('confirm', 'Confirm Password', 'password')}
          <button className="btn btn-success w-100">Register</button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); goLogin() }}>Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register
