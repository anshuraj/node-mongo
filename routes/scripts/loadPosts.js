const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');

const { PostSchema } = require('../../model/Post');

router.get('/', (req, res) => {
  const postsURL = 'https://jsonplaceholder.typicode.com/posts';

  axios(postsURL)
  .then(response => {
    const posts  = response.data;

    // Creating connection for posts db
    const masterDb = mongoose.connection.useDb('posts');
    const Post = masterDb.model('posts', PostSchema);

    Post.insertMany(posts, function(err, docs) {
      if (err){ 
        return console.error(err);
      } else {
        console.log("Posts inserted to db");
        res.json(docs);
      }
    });
  });
});

module.exports = router;