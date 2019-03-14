const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
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

const Post = mongoose.model('post', PostSchema);

module.exports = {
  Post,
  PostSchema
};