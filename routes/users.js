const app = require('express').Router();
const db = require('../db');
const User = db.models.User;

module.exports = app;

app.get('/', (req, res, next) => {
  User.findAll()
    .then( (users) => {
      res.render('users', { title: 'Users', users } );
    }).catch( (err) => {
      next(err);
    })
});

app.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then( (user) => {
      res.send(user);
    }).catch( (err) => {
      next(err);
    });
});
