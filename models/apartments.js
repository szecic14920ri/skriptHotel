'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apartments.init({
    name: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    numberOfBeds: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apartments',
  });
  return Apartments;
};