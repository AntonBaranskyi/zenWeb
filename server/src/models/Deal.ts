import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const Deal = sequelize.define(
  'Deal',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    days_left: {
      type: DataTypes.INTEGER,
    },
    sold_percentage: {
      type: DataTypes.REAL,
    },
    yield: {
      type: DataTypes.REAL,
    },
  },
  {
    tableName: 'deals',
    updatedAt: false,
    createdAt: false,
  }
);
