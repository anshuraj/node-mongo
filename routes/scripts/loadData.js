const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const router = express.Router();

const { UserSchema } = require('../../model/User');
const { PostSchema } = require('../../model/Post');
const { CommentSchema } = require('../../model/Comment');

const usersURL = 'https://jsonplaceholder.typicode.com/users';
const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const commentURL = 'https://jsonplaceholder.typicode.com/comments';

const resourcesToFetch = [
  axios.get(usersURL),
  axios.get(postsURL),
  axios.get(commentURL)
];

router.get('/', (req, res) => {
  axios.all(resourcesToFetch)
    .then(axios.spread(function (users, posts, comments) {
      insertUserData(users.data);
      insertPostsData(posts.data);
      insertCommentsData(comments.data);

      res.json({ msg: "Data inserted!" });
    }));
});

function insertUserData(users) {
  // Creating connection for master db
  const masterDb = mongoose.connection.useDb('master');
  const User = masterDb.model('users', UserSchema);

  User.insertMany(users, function(err, docs) {
    if (err) {
      console.error(err);
    } else {
      console.log("Users inserted to master db");
    }
  });
}

function insertPostsData(posts) {
  // Creating connection for posts db
  const masterDb = mongoose.connection.useDb('posts');
  const Post = masterDb.model('posts', PostSchema);

  Post.insertMany(posts, function(err, docs) {
    if (err) {
      console.error(err);
    } else {
      console.log("Posts inserted to db");
    }
  });
}

function insertCommentsData(comments) {
  // Creating connection for posts db
  const masterDb = mongoose.connection.useDb('posts');
  const Comment = masterDb.model('comments', CommentSchema);

  Comment.insertMany(comments, function(err, docs) {
    if (err){ 
      console.error(err);
    } else {
      console.log("Comments inserted to db");
    }
  });
}

module.exports = router;