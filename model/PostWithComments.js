const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostWithCommentsSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: false
  }
});

module.exports = PostWithComments = mongoose.model('postWithComments', PostWithCommentsSchema);