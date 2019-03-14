const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');

const { CommentSchema } = require('../../model/Comment');

router.get('/', (req, res) => {
  const commentURL = 'https://jsonplaceholder.typicode.com/comments';
  axios(commentURL)
  .then(response => {
    const comments  = response.data;

    // Creating connection for posts db
    const masterDb = mongoose.connection.useDb('posts');
    const Comment = masterDb.model('comments', CommentSchema);

    Comment.insertMany(comments, function(err, docs) {
      if (err){ 
        return console.error(err);
      } else {
        console.log("Comments inserted to db");
        res.json(docs);
      }
    });
  })
  .catch(err => console.log(err));
});

module.exports = router;