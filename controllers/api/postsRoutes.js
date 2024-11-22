const express = require('express');
const postRouter = express.Router();
const { Post } = require('../../models');


// postRouter.get('/postForm', (req, res) => {
//     res.render('postForm.handlebars')
// })

const withAuth = require('../../utils/auth');

postRouter.post('/', async (req, res) => {

  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

postRouter.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log("Deleting post with ID:", req.params.id);
    console.log("Session User ID:", req.session.user_id);

    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      console.log("No post found with the specified ID and user.");
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    console.log("Post deleted successfully.");
    res.status(200).json({ message: 'Post deleted successfully!' });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json(err);
  }
});

postRouter.get('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id.' });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

postRouter.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        city: req.body.city,
        placeName: req.body.placeName,
        description: req.body.description,
        date: req.body.date,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id or you do not have permission to edit it.' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = postRouter;