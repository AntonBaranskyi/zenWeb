import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const User = sequelize.define(
  'User',
  {
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  }
);
