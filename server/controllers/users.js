const Router = require('koa-router');
const passport = require('koa-passport');

const User = require('../models/User');

const router = new Router().prefix('/users');

router.get('/:_id', async (ctx) => {
  const user = await User.findById(ctx.params._id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.throw(404);
  }
});

router.put('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const user = await User.findById(ctx.request.body._id);
  if (!user) {
    ctx.throw(500, 'User has not been found');
  }
  user.name = ctx.request.body.name;
  user.dateOfBirth = ctx.request.body.dateOfBirth;
  user.website = ctx.request.body.website;
  user.bio = ctx.request.body.bio;
  user.phoneNumber = ctx.request.body.phoneNumber;
  user.gender = ctx.request.body.gender;
  user.userImage = ctx.request.body.userImage;
  user.avatarUrl = ctx.request.body.avatarUrl;
  ctx.body = await user.save();
});

router.get('/', (req, res) => {
  res.redirect('http://localhost:3000/');
});

module.exports = router.routes();
