const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const serve = require('koa-static');
const mongoose = require("mongoose");

const config = require('./lib/config');
const handlers = require('./handlers');
const controllers = require('./controllers');
const mongooseConfig = require('./lib/mongoose-config');
const Post = require('./models/Post');
const Chats = require('./models/Chats');


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

const connect = mongoose.connect(config.mongoUri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


io.on('connect', (socket) => {

  socket.on("Input Chat Message", msg => {

    connect.then( async db => {
      try {
        let chat = await Chats.findById(msg.chatShemaId)

        if (!chat) {
          console.log("No chat found")
        }

        chat.messages.push({ text: msg.chatMessage, user: msg.userId })

        await chat.save()

        const lastMessage = chat.messages[chat.messages.length - 1];

        io.emit("Output Chat Message", lastMessage);
      } catch (error) {
        console.error(error);
      }
    })
  });
});

module.exports = (callback) => {
  mongooseConfig()
  server.listen(config.port, callback)
  return server
}
