const express = require('express')
const authRouter = express.Router();
const {User} = require('../../models')

authRouter.post('/signup', async (req ,res)=>{
    
    // Get form data
    const userData= {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }
    // Create model object instance with form data
    try {
        await User.create(userData);
    
        res.redirect('/main-choices')
    } catch {
        return res.status(400).render('signup.handlebars');
    }
})


module.exports = authRouter;