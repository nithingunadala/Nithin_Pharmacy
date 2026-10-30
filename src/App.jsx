import { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Medicines from './components/Medicines'
import Billing from './components/Billing'
import Sales from './components/Sales'
import { initialMedicines } from './data'

// read from localStorage, or use the fallback value
const load = (key, fallback) => {
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : fallback
}

function App() {
  const [users, setUsers] = useState(load('np2_users', []))
  const [session, setSession] = useState(load('np2_session', null)) // email of logged in user
  const [authView, setAuthView] = useState('login')
  const [message, setMessage] = useState('')
  const [page, setPage] = useState('dashboard')
  const [medicines, setMedicines] = useState(load('np2_medicines', initialMedicines))
  const [sales, setSales] = useState(load('np2_sales', []))

  useEffect(() => localStorage.setItem('np2_users', JSON.stringify(users)), [users])
  useEffect(() => localStorage.setItem('np2_session', JSON.stringify(session)), [session])
  useEffect(() => localStorage.setItem('np2_medicines', JSON.stringify(medicines)), [medicines])
  useEffect(() => localStorage.setItem('np2_sales', JSON.stringify(sales)), [sales])

  const currentUser = users.find((u) => u.email === session)

  const handleRegister = (user) => {
    setUsers([...users, user])
    setMessage('Account created successfully. Please login.')
    setAuthView('login')
  }

  if (!currentUser) {
    return authView === 'login'
      ? <Login users={users} message={message} onLogin={setSession} goRegister={() => { setMessage(''); setAuthView('register') }} />
      : <Register users={users} onRegister={handleRegister} goLogin={() => setAuthView('login')} />
  }

  return (
    <div className="d-flex">
      <Sidebar page={page} setPage={setPage} user={currentUser}
        onLogout={() => { setSession(null); setMessage(''); setAuthView('login') }} />
      <main className="flex-grow-1 p-4">
        {page === 'dashboard' && <Dashboard medicines={medicines} sales={sales} user={currentUser} />}
        {page === 'medicines' && <Medicines medicines={medicines} setMedicines={setMedicines} />}
        {page === 'billing' && (
          <Billing medicines={medicines} setMedicines={setMedicines} sales={sales} setSales={setSales} user={currentUser} />
        )}
        {page === 'sales' && <Sales sales={sales} />}
      </main>
    </div>
  )
}

export default App
