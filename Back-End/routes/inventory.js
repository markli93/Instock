const router = require("express").Router();
const inventoryList = require("../data/inventory.json");
const warehouseList = require("../data/warehouses.json");
const { check, validationResult } = require("express-validator/check");
const uuidv1 = require('uuid/v1');

router.get("/", (req, res) => {
  res.json(inventoryList);
});

router.get("/:inventoryId", (req, res) => {
  const targetInventoryId = req.params.inventoryId;
  let inventory = inventoryList.find(item => {
    return targetInventoryId === item.id;
  });
  console.log(inventory);
  if (inventory) {
    res.json(inventory);
  } else {
    res.status(400).send({ error: "Item does not exist" });
  }
});

router.delete("/:inventoryId", (req, res) => {
  const targetInventoryId = req.params.inventoryId;
  let position;
  inventoryList.find((item,index) => {
    if(item.id === targetInventoryId){
        position = index;
    }
  })
    inventoryList.splice(position,1);
   res.json(inventoryList);
});

router.post(
  "/",
  [
    check("name").isString(),
    check("quantity").isInt(),
    check("location").isString(),
    check("description").isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let re = req.body;
    let a = uuidv1()

    const newItem = {
      id: "I" + a,
      name: re.name,
      description: re.description,
      quantity: re.quantity,
      lastOrdered: re.lastOrdered,
      location: re.location,
      country: re.country,
      isInstock: re.isInstock,
      warehouseId: "W4"
    };
    inventoryList.push(newItem);
    res.json(newItem);
  }
);

module.exports = router;
