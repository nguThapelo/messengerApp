const path = require('path');
const express = require('express');
const http = require('http');
const socketoi = require('socket.io');


const formatMessage = require('./views/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./views/users');


const app = express();

const server = http.createServer(app);
const io = socketoi (server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const bot = 'bot';

//run when user connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room}) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

//welcome users
socket.emit('message', formatMessage(bot, 'Welcome to the room!'));

//broadcast when users connect
socket.broadcast
.to(user.room)
.emit('message', formatMessage(bot, `${user.username} has joined`));


//send users and room info

io.to(user.room).emit('roomUsers', {
    room: user.room,
    users: getRoomUsers(user.room)
});
    });

    //get current user
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room)
        .emit('message', formatMessage(user.username, msg));
    });

    //run when users leave room
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit(
                'message', formatMessage(bot, `${user.username} left`)
            )

            //get users info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});


const PORT = process.env.PORT || 5014

server.listen(PORT,  () => {
console.log(`App Running at port: ${PORT}`)
});
