const express = require('express');
const app = express();

const port = process.env.Port || 3000;

const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL);

const User = _conn.define('user', { // create table guidelines
  name: Sequelize.STRING
});

_conn.sync({ force: true });

app.listen(port, () => {
  console.log(`** Listening on Port ${port} **`);
});

