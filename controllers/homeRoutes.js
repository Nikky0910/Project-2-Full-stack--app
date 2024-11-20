const homeRouter = require('express').Router();

homeRouter.get('/', (req, res) => {
    res.render('homepage.handlebars')
})

module.exports = homeRouter;