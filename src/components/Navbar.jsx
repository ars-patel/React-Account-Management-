import logo from '../assets/react.svg' // Add your logo here or use vite.svg

export default function Navbar({ currentUser, onLogout, setPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={() => setPage('login')}>
          <img src={logo || '/vite.svg'} alt="Logo" className="logo me-2" />
          <strong>React Account Management App</strong>
        </a>

        {currentUser && (
          <button className="btn btn-outline-light" onClick={onLogout}>
            Logout ({currentUser.name})
          </button>
        )}
      </div>
    </nav>
  )
}