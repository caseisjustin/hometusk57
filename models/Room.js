import db from '../config/config.js';

const Room = {
  getAll: () => db('rooms').select(),
  getById: (id) => db('rooms').where({ id }).first(),
  create: (data) => db('rooms').insert(data).returning('*'),
  update: (id, data) => db('rooms').where({ id }).update(data).returning('*'),
  delete: (id) => db('rooms').where({ id }).del(),
};

export default Room;
