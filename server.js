const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

const User = db.models.User;

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
