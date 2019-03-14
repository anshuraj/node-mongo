const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const router = express.Router();

const { UserSchema } = require('../../model/User');

router.get('/', (req, res) => {
  const usersURL = 'https://jsonplaceholder.typicode.com/users';

  axios(usersURL)
  .then(response => {
    const users  = response.data;

    // Creating connection for master db
    const masterDb = mongoose.connection.useDb('master');
    const User = masterDb.model('users', UserSchema);

    User.insertMany(users, function(err, docs) {
      if (err){ 
        return console.error(err);
      } else {
        console.log("Users inserted to master db");
        res.json(docs);
      }
    });
  });
});

module.exports = router;