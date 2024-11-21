const express = require('express')
const authRouter = express.Router();
const User = require('../../models/User')


authRouter.get('/signup', (req, res) => {
    res.render('signup.handlebars')
})

authRouter.post('/', async (req ,res)=>{
    
    // Get form data
    const userData= {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }
    // Create model object instance with form data
    try {
        await User.create(userData);
    
        res.redirect('/createpost');

    } catch {
      res.redirect('/');

    }
})

// authRouter.get('/login', (req, res) => {
//     res.render('login.handlebars')
// })

authRouter.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = authRouter;