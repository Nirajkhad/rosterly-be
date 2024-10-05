'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Business extends Model {
    static associate(models) {
    }
  }

  Business.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    abn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personal_phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    suburb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pay_period: {
      type: DataTypes.ENUM('weekly', 'fortnightly', 'monthly'),
      allowNull: true,
    },
    week_start: {
      type: DataTypes.ENUM('mon', 'tue', 'wed', 'thurs', 'fri'),
      allowNull: true,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Business',
    tableName: 'businesses', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  });

  return Business;
};
