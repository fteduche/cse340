const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 * Build inventory detail view (Task 1)
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getInventoryByInvId(inv_id)

    // Check if data was found (optional but good practice)
    if (!data) {
        let nav = await utilities.getNav()
        return res.status(404).render("errors/error", {
            title: "404 Not Found",
            message: "Sorry, we could not find that vehicle.",
            nav,
        })
    }

    const grid = await utilities.buildInventoryDetail(data) // Builds the HTML layout
    let nav = await utilities.getNav()
    const className = data.inv_year + ' ' + data.inv_make + ' ' + data.inv_model

    res.render("./inventory/detail", {
        title: className,
        nav,
        grid,
    })
}

/* ***************************
 * Trigger an intentional 500 error for testing (Task 3)
 * ************************** */
invCont.triggerError = async function (req, res, next) {
    // Intentionally throw an error which will be caught by the error handler middleware
    throw new Error("500 Server Error: Intentional crash for testing purposes.")
}

module.exports = invCont