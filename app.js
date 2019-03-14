const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Loading routes
const user = require('./routes/api/user');
const post = require('./routes/api/post');

// Scripts
const loadUsers = require('./routes/scripts/loadUsers');
const loadPosts = require('./routes/scripts/loadPosts');
const loadComments = require('./routes/scripts/loadComments');
const mergePostWithComments = require('./routes/scripts/mergePostWithComments');

const app = express();

// Db connection
const db = require('./config/keys').mongoURI;
mongoose
  .connect('mongodb://localhost/posts', { useNewUrlParser: true })
  .then(()=> console.log('Connected to db!'))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/user', user);
app.use('/posts', post);

// Data loading scripts
app.use('/loadusers', loadUsers);
app.use('/loadposts', loadPosts);
app.use('/loadcomments', loadComments);
app.use('/merge', mergePostWithComments);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));