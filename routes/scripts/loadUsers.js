const express = require('express');
const router = express.Router();

const axios = require('axios');
const User = require('../../model/User');

router.get('/', (req, res) => {
  const usersURL = 'https://jsonplaceholder.typicode.com/users';

  axios(usersURL)
  .then(response => {
    const users  = response.data;

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