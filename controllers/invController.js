const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;

  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventoryId = req.params.inventoryId; // Get inventory ID from URL
  try {
    const vehicle = await invModel.getInventoryById(inventoryId); // Retrieve vehicle data
    if (vehicle) {
      console.log(vehicle); // Inspect the data being passed to the utility function
      const vehicleHtml = utilities.buildVehicleDetail(vehicle);
      const nav = await utilities.getNav();
      res.render("./inventory/detail", {
        title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
        nav,
        vehicleHtml,
      });
    } else {
      res.status(404).render("error", { message: "Vehicle not found" });
    }
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

exports.buildByClassificationId = (req, res) => {
  // Fetch navigation and other data as needed
  res.render("inventory/classification", {
    title: "Inventory",
    nav: "<ul><li>Home</li><li>Inventory</li></ul>", // Replace with your actual navigation HTML
    // Other data...
  });
};


module.exports = invCont; // Ensure this line is present
