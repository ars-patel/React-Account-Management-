import { useState } from 'react'

export default function Register({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.email === formData.email)

    if (exists) {
      setError('Email already registered!')
      return
    }

    // Save new user
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password // In real app: hash this!
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    setSuccess('Registration successful! Redirecting to login...')
    setTimeout(() => onRegisterSuccess(), 1500)
  }

  return (
    <div className="card p-4">
      <h3 className="text-center mb-4 text-primary">Create Account</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Register
        </button>

        <p className="text-center">
          Already have an account?{' '}
          <a href="#" onClick={() => window.location.reload()}>
            Login here
          </a>
        </p>
      </form>
    </div>
  )
}