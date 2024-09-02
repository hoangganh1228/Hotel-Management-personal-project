const express = require("express");
const app = express();
const database = require("./config/database");
const bodyParser = require("body-parser");

require("dotenv").config();

const route = require("./routes/client/index.route")

database.connect();

const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");


// Routes
route(app);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
