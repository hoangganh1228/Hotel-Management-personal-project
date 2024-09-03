const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");

require("dotenv").config();

const route = require("./routes/client/index.route")

const app = express();
database.connect();

const port = process.env.PORT;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");


// Routes
route(app);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
