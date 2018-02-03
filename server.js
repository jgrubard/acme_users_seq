const express = require('express');
const app = express();
const db = require('./db');

const port = process.env.Port || 3000;

app.listen(port, () => {
  console.log(`** Listening on Port ${port} **`);
});

db.sync()
  .then( () => {
    db.seed();
  });
