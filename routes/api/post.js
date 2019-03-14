const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const { PostSchema } = require('../../model/Post');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const dbName = req.user.id;
    const postsDb = mongoose.connection.useDb(String(dbName));
    const Post = postsDb.model('post', PostSchema); 

    Post.find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(() => res.status(400).json({message: 'Error occured'}));
  }
);

module.exports = router;