const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
  sequelize.define('Todo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
