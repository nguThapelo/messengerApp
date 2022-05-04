const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get user's name aand room

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

//user join chat
socket.emit('joinRoom', { username, room });

//get room users
socket.on('roomUsers', ({ room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});

//retrieve users 
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);

    //enable scroll

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//send messge
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();


//get the message value

let msg = e.target.elements.msg.value;

msg = msg.trim();

if(!msg) {
    return false;
}

//Send message to server
socket.emit('chatMessage', msg);

//clear input after message send
e.target.elements.msg.value = '';
e.target.elements.msg.focus();

});
//output the messages send

const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');

    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span> ${message.time} </span>`;
    div.appendChild(p);

    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}


//output room name
const outputRoomName = (room) => {
    roomName.innerText = room;
}

//output users
const outputUsers = (users) => {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li)
    })
}

//confirm user before they leave room
document.getElementById('leave-btn').addEventListener('click', () => {
    const userLeaveRoom = confirm('Are you sure you want to leave thr room now?');
    if(userLeaveRoom) {
        window.location = '../index.html'
    } else {
        
    }
});

