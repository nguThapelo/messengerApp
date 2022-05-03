const users = [];

//when a user joins
const userJoin = (id, username, room) => {
    const user = { id, username, room }

    users.push(user)
    return user;
}

//retrieve current user

const getCurrentUser = (id) => users.find(user => user.id === id);

//when user leaves
const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);
    
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//retrieve room users

const getRoomUsers = (room) => users.filter(user => user.room === room);

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}