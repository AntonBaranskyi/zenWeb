import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password_hash: {
      type: DataTypes.TEXT,
    },
    resetLink: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  }
);
