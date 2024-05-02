import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DATABASE || 'postgres',
  process.env.USERNAME || 'postgres',
  process.env.PASSWORD || '12345',
  {
    host: process.env.HOST || 'localhost',
    dialect: 'postgres',
  }
);
