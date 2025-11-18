/* ****************************************** 
 * This server.js file is the primary file of the 
 * application. It is used to control the project. 
 *******************************************/
/* *********************** 
 * Require Statements 
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute") // Define inventoryRoute
const utilities = require("./utilities") // Define utilities

/* *********************** 
 * view Engine and Template 
 *************************/
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("layout", "./layouts/layout")

/* *********************** 
 * Routes 
 *************************/
app.use(require("./routes/static"));
app.get("/", baseController.buildHome);
app.use("/inv", inventoryRoute) // Use inventoryRoute

/* *********************** 
 * Local Server Information 
 * Values from .env (environment) file 
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* *********************** 
 * Express Error Handler 
 * Place after all other middleware 
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", { title: err.status || 'Server Error', message: err.message, nav })
})

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send("Something broke!")
// })

/* *********************** 
 * Log statement to confirm server operation 
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})