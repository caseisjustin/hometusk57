import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "1234",
    database: "rooms",
  }
});

db.schema.createTable('users', function (table) {
  table.increments('id').primary();
  table.string('username').notNullable().unique();
  table.string('password').notNullable();
  table.string('role').notNullable();
  table.timestamps(true, true);
});

db.schema.createTable('rooms', function (table) {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.integer('floor').notNullable();
  table.integer('seats').notNullable();
  table.timestamps(true, true);
});


export default db;
