const express = require('express')
const authRouter = express.Router();
const {User} = require('../../models/User')


authRouter.get('/signup', (req, res) => {
    res.render('signup.handlebars')
})

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
    
        res.redirect('/mainChoices')
    } catch {
        return res.status(400).render('signup.handlebars');
    }
})

authRouter.get('/login', (req, res) => {
    res.render('login.handlebars')
})

authRouter.post('/login', async (req, res)=> {

    const user = await User.findAll({
        where: {
            email : req.body.email,
            password: req.body.password
        }
    })

    if (!user){
        console.log('user not found')
        const errorMessage = 'Invalid username or password';
        return res.status(400).json(errorMessage)
    }

    return res.status(200)
})

module.exports = authRouter;