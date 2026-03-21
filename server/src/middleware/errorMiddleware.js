function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal server error'

  if (process.env.NODE_ENV !== 'test') {
    // Keep logs for easier local debugging.
    console.error(error)
  }

  res.status(statusCode).json({ message })
}

export { errorHandler, notFoundHandler }
