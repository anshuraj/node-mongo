const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PostWithComments = require('../../model/PostWithComments');

router.get('/', (req, res) => {
  mongoose.model('post')
    .aggregate([{
      "$lookup": {
        "from": "comments",
        "localField": "id",
        "foreignField": "postId",
        "as": "comments"
      }
    }]).exec(function(err, results) {
      PostWithComments.insertMany(results, function (err, docs) {
        if (err){ 
          return console.error(err);
        } else {
          console.log("Post with comments inserted to db");
          res.json(results);
        }
      });
    });
});

module.exports = router;