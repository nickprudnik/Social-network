const Router = require('koa-router')
const passport = require('koa-passport')

const Post = require('../models/Post')

const router = new Router().prefix('/posts/:postId')

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const post = await Post.findById(ctx.params.postId)
  if (!post) {
    ctx.throw(404, 'Post has not been found')
  }
  if (Error) {
    ctx.throw(404, 'Bad request')
  }
  const { body } = ctx.request.body
  post.unshift({ body, user: ctx.state.user._id })
  ctx.body = await post.save()
})

module.exports = router.routes()