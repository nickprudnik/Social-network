const Router = require('koa-router');
const passport = require('koa-passport');

const Chats = require('../models/Chats');

const router = new Router().prefix('/chats');

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const { name } = ctx.request.body;
  ctx.body = await new Chats({ name }).save();
  ctx.status = 201;
});

router.get('/:name', async (ctx) => {
  const chat = await Chats.find(ctx.params)
  if (chat) {
    ctx.body = chat
  } else {
    ctx.throw(404, 'Chat has not been found')
  }
});

router.get('/', async (ctx) => {
  const { query } = ctx
  const q = 'users' in query ?
    { user: { $in: query.users.split(',') } } : query
  ctx.body = await Post
    .find(q)
    .sort({ createdDate: -1 })
});

module.exports = router.routes();
