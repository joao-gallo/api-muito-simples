const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const sequelize = require("./config/sequelize");

sequelize.sync({ force: false }) // Alterar para `true` se quiser recriar tabelas
    .then(() => console.log("Banco de dados sincronizado!"))
    .catch(err => console.error("Erro ao sincronizar o banco:", err));

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
