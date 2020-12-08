const Router = require('koa-router');
const passport = require('koa-passport');

const Chats = require('../models/Chats');

const router = new Router().prefix('/chats/:chatId/messages');

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const chat = await Chats.findById(ctx.params.chatId)
  if (!chat) {
    ctx.throw(404, 'Chat has not been found')
  }
  const { text } = ctx.request.body
  chat.messages.unshift({ text, user: ctx.state.user._id })
  ctx.body = await chat.save()
})

module.exports = router.routes()
