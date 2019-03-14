const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { UserSchema, User } = require('../../model/User');
const validateLoginInput = require('../../validator/login');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const masterDb = mongoose.connection.useDb('master');
  const userInfo = masterDb.model('user', UserSchema); 

  userInfo.find().select('-password')
  .then(result => {
    res.json(result);
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  // Validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by email
  User.findOne({email})
    .then(user => {
      //Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }
      console.log(user);

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email
            };

            // Generate JWT
            jwt.sign(
              payload,
              'secret',
              { expiresIn: 86400 },
              (err, token) => {
                res.json({success: true, token: `Bearer ${token}`});
            });
          } else {
            errors.password = 'Password is incorrect'
            return res.status(400).json(errors);
          }
        });
    })
});

module.exports = router;