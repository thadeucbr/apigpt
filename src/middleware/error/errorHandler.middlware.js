const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
};

export default errorHandler;
