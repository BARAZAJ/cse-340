const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

exports.buildHome = (req, res) => {
  res.render("index", {
    title: "Home",
    nav: "<ul><li>Home</li><li>Inventory</li></ul>", // Replace with your actual navigation HTML
  });
};


module.exports = baseController
