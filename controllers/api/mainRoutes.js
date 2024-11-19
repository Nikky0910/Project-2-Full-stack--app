const express = require('express')
const mainRouter = express.Router();


mainRouter.get('/mainChoices', (req, res) => {
    res.render('options.handlebars')
})


module.exports = mainRouter;
