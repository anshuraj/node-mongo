const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const postsURL = 'https://jsonplaceholder.typicode.com/posts';

  axios(postsURL)
  .then(response => {
    const posts  = response.data;

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