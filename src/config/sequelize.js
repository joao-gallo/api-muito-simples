const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: console.log, // Habilita logs para ver se está conectando
  }
);

sequelize.authenticate()
  .then(() => console.log("Conexão com o banco de dados estabelecida!"))
  .catch(err => console.error("Erro ao conectar no banco:", err));

module.exports = sequelize;
