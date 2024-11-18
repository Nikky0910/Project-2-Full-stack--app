const express = require('express')
const mainRouter = express.Router();

mainRouter.get('/homepage', (req, res) => {
    res.render('homepage.handlebars')
})

mainRouter.get('/mainChoices', (req, res) => {
    res.render('options.handlebars')
})


module.exports = mainRouter;
