const router = require('express').Router();
const authRouter = require('./api/authRoute')

router.use(authRouter);


module.exports = router;
