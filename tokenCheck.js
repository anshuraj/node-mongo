const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const {User} = require('./model/User');

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.url === '/user/login') {
    next();
  } else {
    const jwtFromReq = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const decoded = jwt.verify(jwtFromReq, 'secret');
    
    // Checking if token exist in user's record
    User.find({'id': decoded.id})
    .then(user => {
      const {tokens} = user[0];
      if (tokens && tokens.filter(tok => tok === jwtFromReq).length) {
        next();
      } else {
        res.status(401).end('Unauthorized');
      }
    })
    .catch(err => console.log(err));
  }
};