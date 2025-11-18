/* ****************************************** * This server.js file is the primary file of the 
 * application. It is used to control the project. 
 *******************************************/
/* *********************** * Require Statements 
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute") // Define inventoryRoute
const utilities = require("./utilities") // Define utilities

/* *********************** * view Engine and Template 
 *************************/
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("layout", "./layouts/layout")

/* *********************** * Routes 
 *************************/
app.use(require("./routes/static"));
// Route for home page (wrapped with error handler)
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use("/inv", inventoryRoute) // Use inventoryRoute

/* *********************** * Local Server Information 
 * Values from .env (environment) file 
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
* Express Error Handler
* Place after all other routes and middleware (Task 2)
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)

  // Set the error status and message
  const status = err.status || 500
  let message;

  if (status === 404) {
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }

  // Set the correct status code and render the error view
  res.status(status).render("errors/error", {
    title: status + ' ' + (status === 404 ? 'Not Found' : 'Server Error'),
    message,
    nav
  })
})

/* *********************** * Log statement to confirm server operation 
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})