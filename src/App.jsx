import { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound' // New component

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
      setCurrentPage('profile')
    }
  }, [])

  // Handle navigation safely
  const navigateTo = (page) => {
    const validPages = ['login', 'register', 'profile']
    if (validPages.includes(page)) {
      setCurrentPage(page)
    } else {
      setCurrentPage('notfound')
    }
  }

  const handleLogin = (user) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
    setCurrentPage('profile')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    setCurrentPage('login')
  }

  const handleRegisterSuccess = () => {
    setCurrentPage('login')
  }

  return (
    <>
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        setPage={navigateTo}
      />

      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">

            {currentPage === 'login' && (
              <Login onLogin={handleLogin} setPage={navigateTo} />
            )}

            {currentPage === 'register' && (
              <Register onRegisterSuccess={handleRegisterSuccess} />
            )}

            {currentPage === 'profile' && currentUser && (
              <Profile user={currentUser} setCurrentUser={setCurrentUser} />
            )}

            {currentPage === 'notfound' && <NotFound />}

            {/* Fallback for any unknown state */}
            {![ 'login', 'register', 'profile', 'notfound' ].includes(currentPage) && (
              <NotFound />
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default App