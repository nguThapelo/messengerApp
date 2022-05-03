const express = require('express');
const http = require('http');
const Socketoi = require('socket.io');
const exphbs = require('express-handlebars');



const app = express();

const server = http.createServer(app);
const io = Socketoi (server);

const bodyParser = require('body-parser');

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));


//run when user connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room}) => {
        socket.join(user.room)
    })
})

//welcome users


//broadcast when users connect

//send users and room info

//get current user

//run when users leave room

//get users info

app.get('/', (req, res) => {
    res.render("home")
});

app.get('/chat', (req, res) => {
    res.render("chat")
});

const PORT = process.env.PORT || 5014

app.listen(PORT,  () => {
console.log(`App Running at port: ${PORT}`)
});
