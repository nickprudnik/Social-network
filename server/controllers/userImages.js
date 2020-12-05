const Router = require('koa-router');
const passport = require('koa-passport');
const multer = require('@koa/multer');

const router = new Router().prefix('/userImages')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});

const uploads = multer({ storage });

router.put('/', uploads.single('image'), passport.authenticate('jwt', { session: false }), async (ctx) => {
  
})

module.exports = router.routes()
