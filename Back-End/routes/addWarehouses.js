const router = require("express").Router();
const warehouses = require("../data/warehouses.json");
const uuidv4 = require('uuid/v4');

//make a post request to add new data for warehouse
router.post("/", (req, res) => {
    
    var newWarehouse = {
        id: uuidv4(),
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        inventoryCategories: req.body.inventoryCategories
      };
    warehouses.push(newWarehouse);
    res.json(warehouses);

    if (name.length === 0 || 
        address.length === 0 || 
        contact.length === 0 || 
        inventoryCategories.length === 0) {
        res.status(404).send("Please enter values");
        }
  
})

module.exports = router;