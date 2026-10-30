import { shop } from '../shop'

const links = [
  { key: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { key: 'medicines', label: 'Medicines', icon: 'bi-capsule' },
  { key: 'billing', label: 'Billing', icon: 'bi-receipt' },
  { key: 'sales', label: 'Sales History', icon: 'bi-graph-up' },
]

function Sidebar({ page, setPage, user, onLogout }) {
  return (
    <div className="sidebar p-3 d-flex flex-column">
      <h5 className="text-white mb-4">
        <i className="bi bi-capsule-pill me-2"></i>{shop.name}
      </h5>
      <ul className="nav flex-column gap-1">
        {links.map((l) => (
          <li className="nav-item" key={l.key}>
            <a className={'nav-link ' + (page === l.key ? 'active' : '')} onClick={() => setPage(l.key)}>
              <i className={'bi ' + l.icon + ' me-2'}></i>{l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-white small mb-2">
        <i className="bi bi-person-circle me-1"></i>{user.name} ({user.role})
      </div>
      <div className="text-white small mt-auto mb-2">
        <i className="bi bi-person-circle me-1"></i>{user.name}
      </div>
      <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
        <i className="bi bi-box-arrow-left me-1"></i>Logout
      </button>
    </div>
  )
}

export default Sidebar
