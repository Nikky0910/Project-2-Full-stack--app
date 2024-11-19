const express = require('express');
const postRouter = express.Router();
const Post = require('../../models/Post')

postRouter.get('/postForm', (req, res) => {
    res.render('postForm.handlebars')
})

postRouter.post('/postForm', async (req ,res)=>{
    
    // Get form data
    const postData= {
        city: req.body.city,
        placeName: req.body.placeName,
        description: req.body.description,
        date_created: req.body.date_created,
    }
    // Create model object instance with form data
    try{
        await Post.create(postData);
        res.redirect('/allPosts')
    } catch {
        return res.status(400).render('postForm.handlebars');
    }
    
    
})

postRouter.get('/allPosts', (req, res) => {
    res.render('feed.handlebar')
})

module.exports = postRouter;