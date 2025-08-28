function InvalidDetailsException(message) {
  const error = new Error(message);
  // error.name = "InvalidDetailsException";
  // error.message = message;
  // error.statusCode = 400;
  return error;
}

function DetailsDoesnNotExist(message) {
  const error = new Error(message);
  error.name = "DetailsDoesnNotExist";
  error.message = message;
  error.statusCode = 404;
  return error;
}
function InvalidEmailException(message) {
  const error = new Error(message);
  error.name = "InvalidEmailException";
  error.message = message;
  error.statusCode = 400;
  return error;
}
function CustomerNotFoundException(message) {
  const error = new Error(message);
  error.name = "CustomerNotFoundException";
  error.message = message;
  error.statusCode = 404;
  return error;
}

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    error: message,
  });
};

export {
  DetailsDoesnNotExist,
  InvalidDetailsException,
  errorHandler,
  InvalidEmailException,
  CustomerNotFoundException,
};
