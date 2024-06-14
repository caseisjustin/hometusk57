import db from '../config/config.js';

const User = {
  findByUsername: (username) => db('users').where({ username }).first(),
  create: (data) => db('users').insert(data).returning('*'),
};

export default User;
