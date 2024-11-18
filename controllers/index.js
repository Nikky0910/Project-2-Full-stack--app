const router = require('express').Router();
const authRouter = require('./api/authRoutes')
const mainRouter = require('./api/mainRoutes')
const postRouter = require('./api/postsRoutes')

router.use("/users", authRouter);
router.use("/main", mainRouter);
router.use("/posts", postRouter);


module.exports = router;
