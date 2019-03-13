const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
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

module.exports = User = mongoose.model('user', UserSchema);