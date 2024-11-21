const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {

  res.render('homepage');


  //   try {
  // Get all projects and JOIN with user data
  // const projectData = await Project.findAll({
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['name'],
  //     },
  //   ],
  // });

  // Serialize data so the template can read it
  // const projects = projectData.map((project) => project.get({ plain: true }));

  // Pass serialized data and session flag into template
  // res.render('homepage', {
  //   projects,
  //   logged_in: req.session.logged_in
  // });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('createpost', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/createpost');
    return;
  }

  res.render('login');
});


router.get('/posts', async (req, res) => {

  try {
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const projects = projectData.map((project) => {

      const projectPlain = project.get({ plain: true });

      const userName = projectPlain.user.name;

      projectPlain.imageSrc = `/imagesProfile/${userName}.jpg`;

      projectPlain.comments = [
        {
          userName: "Leo Messi",
          content: "Leo MEssi, the best player in the history"
        }
      ]

      return projectPlain;

    });

    res.render('posts', {
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/createpost', withAuth, async (req, res) => {

  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const postArray = postData.map((post) => post.get({ plain: true }));

    console.log("leoMessi", postArray);


    // Pass serialized data and session flag into template
    res.render('createpost', {
      postArray,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }




  // res.render('createpost');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
