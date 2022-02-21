// const morgan = require('morgan')
// app.use(morgan('combined')) log ra status request


const path = require('path'); //LẤY DIR PATH
const express = require('express');
var exphbs = require('express-handlebars');
const route = require('./routes');


const app = express();


const port = 3003;
app.listen(process.env.PORT || port)

console.log(`http://localhost:${port}/`);
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

// var axios = require("axios").default;

// var options = {
//     method: 'GET',
//     url: 'https://google-news.p.rapidapi.com/v1/top_headlines',
//     params: { lang: 'en', country: 'US' },
//     headers: {
//         'x-rapidapi-host': 'google-news.p.rapidapi.com',
//         'x-rapidapi-key': '773aad1f24msh7584c6a89149d00p1e93acjsnce9ea7af9938'
//     }
// };

// axios.request(options).then(function(response) {
//     console.log(response.data);
// }).catch(function(error) {
//     console.error(error);
// });








//Route init
route(app);
