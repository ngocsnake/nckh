const path = require('path'); //LẤY DIR PATH
const express = require('express');
var exphbs = require('express-handlebars');
const route = require('./routes');

const app = express();


const port = 3003;
app.listen(process.env.PORT || port)

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


// setInterval(() => {
//     console.log('keep server active')
// }, 600000);


//Route init
route(app);
