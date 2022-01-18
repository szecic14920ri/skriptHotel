'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservations.init({
    guestJMBG: DataTypes.STRING,
    apartmentName: DataTypes.STRING,
    dateOfArrival: DataTypes.DATE,
    dateOfDeparture: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reservations',
  });
  return Reservations;
};