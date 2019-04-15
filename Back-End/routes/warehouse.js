const router = require('express').Router();
const warehouseList = require('../data/warehouses.json');
const inventorylist = require('../data/inventory.json');

router.get('/', (req, res) => {
    res.json(warehouseList);
 })

router.get('/:warehouseId', (req, res) => {
    this.checkWarehouse = warehouseList.find(item => {
        return item.id === req.params.warehouseId;
    });
    if (this.checkWarehouse == undefined) {
        res.status(404).send('Error: Item does not exist');
    }
    else {
        this.warehouseInventory = inventorylist.filter(item => {
            return item.warehouseId === req.params.warehouseId;
        });
        res.json(this.warehouseInventory);
    }
})

module.exports = router;