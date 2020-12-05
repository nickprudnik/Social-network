const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const serve = require('koa-static');


const config = require('./lib/config');
const handlers = require('./handlers');
const controllers = require('./controllers');
const mongooseConfig = require('./lib/mongoose-config');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const Post = require('./models/Post')

handlers.forEach((h) => app.use(h));

app.use(serve('uploads'));

app.use(controllers.routes());
app.use(controllers.allowedMethods());

// POSTS - Change
io.on('connection', function(socket){
  const changeStream = Post.watch();
  
  changeStream.on('change', next => {
    console.log("Collection Post has changed")
    
    socket.emit('RefreshPostsPage', "Hi posts");
  });
});


io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    // console.log(getUsersInRoom(user.room))

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

module.exports = (callback) => {
  mongooseConfig()
  server.listen(config.port, callback)
  return server
}
