const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.use("/warehouses", require("./routes/addWarehouses"));
app.use("/warehouses", require("./routes/warehouse"));

app.use('/inventory', require('./routes/inventory.js'));


app.listen(PORT, () => {
   console.log(`server is listening on port ${PORT}`);
});

