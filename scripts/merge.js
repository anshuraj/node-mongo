const mongoose = require('mongoose');

const { PostSchema } = require('../model/Post');

const db = require('../config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(()=> console.log('Connected to db!'))
  .catch((err) => console.log(err));

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
  });