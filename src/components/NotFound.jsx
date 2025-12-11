export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p className="text-muted mb-4">Sorry, the page you are looking for does not exist.</p>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => window.location.href = '/'}
      >
        Go Home
      </button>
    </div>
  )
}