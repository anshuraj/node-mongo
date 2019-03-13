const express = require('express');
const router = express.Router();
const axios = require('axios');

const Comment = require('../../model/Comment');

router.get('/', (req, res) => {
  const commentURL = 'https://jsonplaceholder.typicode.com/comments';
  axios(commentURL)
  .then(response => {
    const comments  = response.data;

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