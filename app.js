const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');

// Loading routes
const user = require('./routes/api/user');
const post = require('./routes/api/post');

const app = express();

// Db connection
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(()=> console.log('Connected to db!'))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

const upload = multer({ dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename;
  },
});

app.use(upload.single('photo'));

app.use('/user', user);
app.use('/posts', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));