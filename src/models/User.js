"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // 🔥 Certifique-se de importar a conexão corretamente

class User extends Model { }

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // 🔥 Vincula ao Sequelize
    modelName: "User",
    tableName: "Users", // 🔥 Certifica que a tabela será criada com esse nome
    timestamps: false, // 🔥 Evita criar os campos `createdAt` e `updatedAt` automaticamente
  }
);

module.exports = User;
