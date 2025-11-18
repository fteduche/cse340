const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + 'details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* **************************************
* Build the detail view HTML (Task 1)
* ************************************ */
Util.buildInventoryDetail = function (vehicle) {
    let grid = ''
    if (vehicle) {
        grid = '<div class="detail-container">'

        // Image section (full size image)
        grid += `<div class="detail-image">`
        grid += `<img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} ${vehicle.inv_year}">`
        grid += `</div>`

        // Details section
        grid += `<div class="detail-info">`

        // Price formatting with currency symbol
        let price = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(vehicle.inv_price)

        grid += `<h3 class="price">No-Haggle Price: ${price}</h3>`

        grid += `<p class="description"><strong>Description:</strong> ${vehicle.inv_description}</p>`

        // Mileage formatting with commas
        let mileage = vehicle.inv_miles.toLocaleString('en-US')
        grid += `<p><strong>Mileage:</strong> ${mileage}</p>`

        grid += `<ul class="specs-list">`
        grid += `<li><strong>Year:</strong> ${vehicle.inv_year}</li>`
        grid += `<li><strong>Make:</strong> ${vehicle.inv_make}</li>`
        grid += `<li><strong>Model:</strong> ${vehicle.inv_model}</li>`
        grid += `<li><strong>Color:</strong> ${vehicle.inv_color}</li>`
        grid += `<li><strong>Classification:</strong> ${vehicle.classification_name || 'N/A'}</li>`
        grid += `</ul>`

        grid += `</div>` // Close detail-info
        grid += `</div>` // Close detail-container
    } else {
        grid += '<p class="notice">Sorry, no details could be found for this vehicle.</p>'
    }
    return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util