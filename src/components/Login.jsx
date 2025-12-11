import { useState } from 'react'

export default function Login({ onLogin, setPage }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    )

    if (!user) {
      setError('Invalid email or password!')
      return
    }

    onLogin(user)
  }

  return (
    <div className="card p-4">
      <h3 className="text-center mb-4 text-primary">Welcome Back</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Login
        </button>

        <p className="text-center">
          Don't have an account?{' '}
          <a href="#" onClick={() => setPage('register')}>
            Register here
          </a>
        </p>
      </form>
    </div>
  )
}