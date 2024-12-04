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

/* ***********************
 * Error-handling Middleware
 *************************/
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(err.status || 500).render("error", {
    title: "Server Error",
    message: "Oh no! There was a crash. May be try a different route?",
    error: err.status === 500 ? null : err.message, // Show error details only if not 500
    nav: "<ul><li>Home</li><li>Inventory</li></ul>", // Include navigation in error page
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


