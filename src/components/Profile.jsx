import { useState } from 'react'

export default function Profile({ user, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')

  const handleSave = () => {
    // Only validate password if user typed something
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match!')
        return
      }
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    const updatedUsers = users.map(u =>
      u.id === user.id
        ? {
            ...u,
            name: formData.name,
            // Only update password if new one is provided and not empty
            ...(formData.password && { password: formData.password })
          }
        : u
    )

    localStorage.setItem('users', JSON.stringify(updatedUsers))

    const updatedUser = {
      ...user,
      name: formData.name,
      // Only update password in currentUser if new one was set
      ...(formData.password && { password: formData.password })
    }

    setCurrentUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    setMessage('Profile updated successfully!')
    setIsEditing(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: ''
    })
    setIsEditing(false)
    setMessage('')
  }

  return (
    <div className="card p-4">
      <h3 className="text-center mb-4 text-success">My Profile</h3>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      {!isEditing ? (
        <>
          <div className="text-center mb-4">
            <div
              className="bg-primary text-white rounded-circle mx-auto d-inline-flex align-items-center justify-content-center"
              style={{ width: '100px', height: '100px', fontSize: '40px' }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-4"><strong>Email:</strong> {user.email}</p>

          <button
            className="btn btn-outline-primary w-100"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email (cannot be changed)</label>
            <input
              type="email"
              className="form-control bg-light"
              value={formData.email}
              disabled
            />
            <small className="text-muted">Email is permanent after registration</small>
          </div>

          <div className="mb-3">
            <label className="form-label">New Password <span className="text-muted">(optional)</span></label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Retype new password"
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}