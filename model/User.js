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
    default: '$2a$12$peX8oLM5U8IBqOhheFBB6ORCQi5E5z1lJLb1SXz7FAjPE6RqxfiVi'
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
  photo: {
    src: {
      type: String,
      required: false
    },
    contentType: {
      type: String,
      required: false
    },
    filename: {
      type: String,
      required: false
    }
  }
});

const User = mongoose.model('user', UserSchema)

module.exports = {
  User,
  UserSchema
}