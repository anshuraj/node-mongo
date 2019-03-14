const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { PostSchema, Post } = require('../../model/Post');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const dbName = req.user.id;
    console.log(req.user.id);
    const postsDb = mongoose.connection.useDb(String(dbName));
    const postInfo = postsDb.model('post', PostSchema); 

    postInfo.find()
    .then(result => {
      res.json(result);
    });
    // res.json({msg: 'Post works!'}); 
  }
);

module.exports = router;