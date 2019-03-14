const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: 'secret'
  },
  address: {
    type: Object,
    required: false
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  company: {
    type: Object,
    required: true
  },
});

router.get('/', (req, res) => {
  const masterDb = mongoose.connection.useDb('master');

  const userInfo = masterDb.model('user', UserSchema); 

  userInfo.find()
  .then(result => {
    console.log(result);
    res.json(result);
  });
});

module.exports = router;