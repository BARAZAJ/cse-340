const errorController = {};

// Method to throw an intentional error
errorController.throwError = (req, res, next) => {
  const error = new Error("Intentional error for testing purposes.");
  error.status = 500; // Set the status code to 500
  throw error; // Throw the error to be caught by middleware
};

module.exports = errorController;
