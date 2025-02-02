"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // 🔥 Certifique-se de importar a conexão corretamente
const bcrypt = require("bcryptjs");


class User extends Model {
  // Verifica se a senha inserida bate com a senha armazenada
  checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
  }
}

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
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
      },
      beforeUpdate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
      },
    }
  }
);

module.exports = User;
