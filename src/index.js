// const morgan = require('morgan')
// app.use(morgan('combined')) log ra status request


const path = require('path'); //LẤY DIR PATH
const express = require('express');
var exphbs = require('express-handlebars');
const route = require('./routes');


const app = express();

const port = 3003;
app.listen(process.env.PORT)


const helper = require('../src/app/helpers')

// templates engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {}
}));

app.set('view engine', 'hbs');

var views = path.join(__dirname, 'resources', 'views');
var static = path.join(__dirname, 'resources', 'public');

app.set('views', views);
app.use(express.static(static));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



//Route init
route(app);