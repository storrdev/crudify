const errorHandler = (cb, message = "Internal Server Error") => async (
  req,
  res
) => {
  try {
    await cb(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message, error: error.message });
  }
};

module.exports = errorHandler;
