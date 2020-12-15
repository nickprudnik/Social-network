const Router = require('koa-router');
const passport = require('koa-passport');

const Post = require('../models/Post');

const router = new Router().prefix('/posts');

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx, io) => {
  const { body } = ctx.request.body;
  const user = ctx.state.user._id;
  ctx.body = await new Post({ body, user }).save();
  ctx.status = 201;

  ctx.io.emit('RefreshPostsPage', user);
});

router.get('/', async (ctx) => {
  const { query } = ctx;
  const q = 'users' in query
    ? { user: { $in: query.users.split(',') } } : query;
  ctx.body = await Post
    .find(q)
    .sort({ createdDate: -1 });
});

router.get('/:id', async (ctx) => {
  const post = await Post.findById(ctx.params.id);
  if (post) {
    ctx.body = post;
  } else {
    ctx.throw(404, 'Post has not been found');
  }
});

router.put('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const post = await Post.findById(ctx.request.body._id);
  if (!post) {
    ctx.throw(404, 'Post has not been found');
  }

  const { body } = ctx.request.body;
  post.body = body;
  ctx.body = await post.save();

  const user = ctx.request.body._id;
  ctx.io.emit('RefreshPostsPage', user);
});

router.delete('/:_id', passport.authenticate('jwt', { session: false }), async (ctx) => {
  await Post.findOneAndRemove({
    _id: ctx.params._id,
    user: ctx.state.user._id
  });
  ctx.body = { message: 'Post has been deleted' };

  const user = ctx.state.user._id;
  ctx.io.emit('RefreshPostsPage', user);
});

module.exports = router.routes();
