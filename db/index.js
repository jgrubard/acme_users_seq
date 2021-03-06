const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL);

const User = _conn.define('user', { // create table guidelines
  name: Sequelize.STRING
});

const sync = () => {
  return _conn.sync({ force: true })
};

const seed = () => {
  return Promise.all([
    User.create({ name: 'Cersei' }),
    User.create({ name: 'Jaime' }),
    User.create({ name: 'Tyrion' })
  ]);
};

module.exports = {
  sync,
  seed,
  models: {
    User
  }
};
