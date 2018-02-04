const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const User = db.models.User;
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/public', express.static(path.join(__dirname, 'node_modules')));

app.use( (req, res, next) => {
  res.locals.path = req.url;
  next();
});

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home'});
});

app.use('/users', require('./routes/users'));

const port = process.env.Port || 3000;

app.listen(port, () => {
  console.log(`** Listening on Port ${port} **`);
});

db.sync()
  .then( () => {
    db.seed();
  });
