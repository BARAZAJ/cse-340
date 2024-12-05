/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* *********************** Require Statements *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoutes = require("./routes/inventoryRoute");
const errorController = require("./controllers/errorController");
const Util = require('./utilities'); // CommonJS


/* ***********************
 * View Engine and templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***********************
 * Middleware for Static Files
 *************************/
app.use(express.static("public"));

/* ***********************
 * Routes
 *************************/
// Static routes
app.use(staticRoutes);

// Index route
app.get("/", baseController.buildHome);

// Inventory routes
app.use("/inv", inventoryRoutes);

// Intentional error route
app.get("/cause-error", errorController.throwError);

// 404 Error Handler
app.use(async (req, res, next) => {
  const nav = await Util.getNav(); // Fetch navigation for the 404 page
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    message: "404- Sorry, the page you are looking for does not exist.",
    error: null, // No error details for a 404
    nav,
  });
});

/* ***********************
 * Error-handling Middleware
 *************************/
// Global Error Handler
app.use(async (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  const nav = await Util.getNav(); // Fetch navigation dynamically
  res.status(err.status || 500).render("error", {
    title: "Server Error",
    message: err.message || "An unexpected error occurred on the server.",
    error: process.env.NODE_ENV === "development" ? err : null, // Show error details only in development
    nav,
  });
});
// Route to explicitly trigger a server error (500)
app.get('/cause-error', (req, res, next) => {
  // Simulate an error
  const error = new Error('505 - This is a simulated server error.');
  error.status = 500; // Set the status code for the error
  next(error); // Pass the error to the error-handling middleware
});

// Catch-all 404 handler for undefined routes
app.use(async (req, res, next) => {
  const nav = await Util.getNav(); // Fetch navigation if needed
  res.status(404).render('error', {
      title: '404 - Page Not Found',
      message: 'Error 404: The page you are looking for does not exist.',
      nav, // Pass navigation data if available
  });
});

app.use((req, res, next) => {
  res.locals.nav = "<ul><li>Home</li><li>Inventory</li></ul>"; // Replace with actual navigation HTML or logic
  next();
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});


