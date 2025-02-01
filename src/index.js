const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");


const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
