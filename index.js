const express = require("express");
const exphbs = require('express-handlebars');
const app = express();

const bodyParser = require('body-parser');

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index")
});

const PORT = process.env.PORT || 5014

app.listen(PORT,  () => {
console.log(`App Running at port: ${PORT}`)
});
