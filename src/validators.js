// Small reusable validation helpers (plain JavaScript)
export const isValidName = (v) => /^[A-Za-z][A-Za-z .]{2,39}$/.test(v.trim())
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v.trim()) // Indian mobile number
export const isStrongPassword = (v) => v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v)
