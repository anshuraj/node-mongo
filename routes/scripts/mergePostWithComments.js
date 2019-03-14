const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { PostSchema } = require('../../model/Post');

router.get('/', (req, res) => {
  const connection = mongoose.connection.useDb('posts');
  connection.model('post')
    .aggregate([{
      "$lookup": {
        "from": "comments",
        "localField": "id",
        "foreignField": "postId",
        "as": "comments"
      }
    }]).exec(function(err, results) {
      let userPosts = {};

      results.forEach(post => {
        if (userPosts[post.userId]) {
          userPosts[post.userId].push(post);
        } else {
          userPosts[post.userId] = [post];
        }
      });

      for (let user in userPosts) {
        const userDb = mongoose.connection.useDb(user);
        const posts = userDb.model('post', PostSchema);
  
        posts.insertMany(userPosts[user], function(err, docs) {
          if (err){ 
            return console.error(err);
          } else {
            console.log(`Inserted to ${user} db`);
          }
        });
      }

      res.json(results);
    });
});

module.exports = router;