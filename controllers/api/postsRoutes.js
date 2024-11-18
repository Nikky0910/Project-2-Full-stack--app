const express = require('express');
const postRouter = express.Router();
const {Post} = require('../../models')

postRouter.get('/postForm', (req, res) => {
    res.render('postForm.handlebars')
})

postRouter.post('/postForm', async (req ,res)=>{
    
    // Get form data
    const postData= {
        destination : req.body.destination,
        description : req.body.description,
        recommendations: req.body.recommendations
    }
    // Create model object instance with form data
    try {
        await Post.create(postData);
    
        res.redirect('/allPosts')
    } catch {
        return res.status(400).render('postForm.handlebars');
    }
})

postRouter.get('/allPosts', (req, res) => {
    res.render('posts.handlebar')
})