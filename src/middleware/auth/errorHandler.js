const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    //   authentication error
    return res.status(401).json({ message: "The user not Authorization" });
  }

  if (err.name === "ValidationError") {
    //   validation error
    return res.status(401).json({ message: err });
  }
  //   default error
  return res.status(500).json({ message: err });
};

module.exports = errorHandler;
