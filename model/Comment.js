const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  postId: {
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
  body: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = {
  Comment,
  CommentSchema
};