const express = require("express");
const  path = require('path');
const methodOverride = require('method-override')
const database = require("./config/database");

const systemConfig = require("./config/system");

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash');
const moment = require("moment");

require("dotenv").config();


const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route")

const app = express();
database.connect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}//views`);
app.set("view engine", "pug");
// Flash
console.log(__dirname);

app.use(cookieParser('JHFJSBFJKSE'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// End Flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//End TinyMCE


//App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
// Routes
route(app);
routeAdmin(app);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
