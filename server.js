const express = require('express');
const app = express();
const db = require('./db');
const User = db.models.User;
const nunjucks = require('nunjucks');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// app.get('/', (req, res, next) => {
//   res.render('index', { title: 'Home'});
// });

app.get('/users', (req, res, next) => {
  User.findAll()
    .then( (users) => {
      res.send(users);
    }).catch( (err) => {
      next(err);
    })
});

app.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then( (user) => {
      res.send(user);
    }).catch( (err) => {
      next(err);
    });
});



const port = process.env.Port || 3000;

app.listen(port, () => {
  console.log(`** Listening on Port ${port} **`);
});

db.sync()
  .then( () => {
    db.seed();
  });
