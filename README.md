# React User Management System

A clean, responsive user authentication system built with **React + Vite + Bootstrap 5**. Allows users to register, log in, view and securely edit their profile.

**Live Demo**: https://reactaccount.vercel.app

## Features

- User Registration with email uniqueness check
- Secure Login (stored in localStorage)
- View Profile with avatar initial
- Edit Profile:
  - Change Name
  - Change Password (optional)
  - Email is permanent (disabled for security)
- Prevents duplicate email registration
- Beautiful UI with Bootstrap 5
- Clickable logo navigation
- 404 Not Found page for invalid routes
- Fully responsive design
- Clean, commented, and maintainable code

## Tech Stack

- React 18+
- Vite (fast development server)
- Bootstrap 5 + Bootstrap Icons
- localStorage for persistent data (no backend required)
- Pure JSX (no class components)

## Project Structure
src/
├── components/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Navbar.jsx
│   └── NotFound.jsx
├── assets/
│   └── logo.png (optional)
├── App.jsx
├── main.jsx
└── index.css


## How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

npm install

npm run dev

## Deployment
https://reactaccount.vercel.app
