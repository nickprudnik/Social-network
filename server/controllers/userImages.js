const Router = require('koa-router');
const passport = require('koa-passport');
const multer = require('@koa/multer');

const router = new Router().prefix('/userImages');

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'uploads');
  },
  filename (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploads = multer({ storage });

router.post('/', uploads.single('image'), passport.authenticate('jwt', { session: false }), async (ctx) => {
  ctx.body = {
    code: 1,
    data: ctx.file
  };
});

module.exports = router.routes();
