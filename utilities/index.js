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
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="/inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="/inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};
Util.buildVehicleDetail = function (vehicle) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price);

  const formattedMileage = vehicle.inv_miles
    ? `${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles`
    : "Mileage not available";

  return `
    <div class="vehicle-detail">
      <div>
        <h1>${vehicle.inv_year || "Unknown Year"} ${vehicle.inv_make || "Unknown Make"} ${vehicle.inv_model || "Unknown Model"}</h1>
        <img src="${vehicle.inv_image || "/images/placeholder.png"}" alt="Image of ${vehicle.inv_make || "Vehicle"}">
      </div>
      <div>
        <h2>${vehicle.inv_make} ${vehicle.inv_model} details</h2>
        <p><strong>Price:</strong> ${formattedPrice}</p>
        <p><strong> Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color || "Not specified"}</p>
        <p><strong>Mileage:</strong> ${formattedMileage}</p>
      </div>
    </div>
  `;
};






module.exports = Util