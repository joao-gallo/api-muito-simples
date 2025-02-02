'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

class Cliente extends Model { }

Cliente.init({
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING
},
  {
    sequelize,
    modelName: 'Cliente',
    tableName: 'Clientes',
    timestamps: false
  })

module.exports = Cliente
