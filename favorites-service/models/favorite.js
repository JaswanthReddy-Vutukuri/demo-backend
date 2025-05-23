const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
  sequelize.define('Favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    todoId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  });
