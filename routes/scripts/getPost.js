const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let userPosts = {};

  PostWithComments.find()
  .then(posts => {
    posts.forEach(post => {
      if (userPosts[post.userId]) {
        userPosts[post.userId].push(post);
      } else {
        userPosts[post.userId] = [post];
      }
    });
    res.json(userPosts);
  })
  .catch(err => console.log(err));
});

module.exports = router;