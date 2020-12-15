const Router = require('koa-router');

const auth = require('./auth');
const posts = require('./posts');
const postsComments = require('./posts-comments');
const postsLikes = require('./posts-likes');
const subscriptions = require('./subscriptions');
const users = require('./users');
const userImages = require('./userImages');
const chats = require('./chat');
const messages = require('./messages');

const router = new Router().prefix('/api');

router.use(auth, posts, postsComments, postsLikes, subscriptions, users, userImages, chats, messages);

module.exports = router;
