import { Sequelize } from 'sequelize';

const database = process.env.DATABASE
  ? process.env.DATABASE.toString()
  : 'postgres';
const username = process.env.BD_USERNAME || 'postgres';
const password = process.env.PASSWORD
  ? process.env.PASSWORD.toString()
  : '12345';
const host = process.env.HOST ? process.env.HOST.toString() : 'localhost';
const port = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT.toString())
  : 5432;

console.log(username);

export const sequelize = new Sequelize(
  database,
  username,
  password,

  {
    host,
    dialect: 'postgres',
    port,
  }
);
