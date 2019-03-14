const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const fs = require('fs');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Keys = require('../../config/keys');

const { UserSchema, User } = require('../../model/User');
const validateLoginInput = require('../../validator/login');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const masterDb = mongoose.connection.useDb('master');
  const userInfo = masterDb.model('user', UserSchema); 

  userInfo.find().select('-password')
  .then(result => {
    res.status(200).json(result);
  })
  .catch(() => res.status(400).json({message: 'Error occured'}));  
});

router.post(
  '/updatephoto',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Find user and update photo
    User.findOne({ 'id': req.user.id })
    .then(user => {
      user.photo.src = req.file.path;
      user.photo.filename = req.file.filename;
      user.photo.contentType = req.file.mimetype;
      user.save()
      .then(() => res.json({message: 'Photo saved'}))
      .catch(() => res.status(400).json({message: "Error occured"}));
      });
  }
);

router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const jwtFromReq = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // Find user and update photo
    User.findOne({ 'id': req.user.id })
    .then(user => {
      user.tokens = user.tokens.filter(token => token !== jwtFromReq);
      user.save()
      .then(() => res.json({message: 'User Loggedout'}))
      .catch(() => res.status(400).json({message: "Error occured"}));
      });
  }
);

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
              Keys.secret,
              { expiresIn: 86400 },
              (err, token) => {
                user.tokens = [...user.tokens, token];
                user.save();
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