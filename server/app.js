const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);


const config = require('./lib/config');
const handlers = require('./handlers');
const controllers = require('./controllers');
const mongooseConfig = require('./lib/mongoose-config');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const Post = require('./models/Post')

handlers.forEach((h) => app.use(h));

app.use(controllers.routes());
app.use(controllers.allowedMethods());

const changeStream = Post.watch();

io.on('connect', (socket) => {
  console.log("socket connected");
    // POSTS - Change
  changeStream.on('change', function(change) {
    console.log('COLLECTION CHANGED');

    Post.find({}, (err, data) => {
        if (err) throw err;

        if (data) {
            // RESEND ALL POSTS TO ALL USERS
            socket.emit('users', data);
        }
    });
  });
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

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
