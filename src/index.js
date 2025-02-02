const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const clienteRoutes = require("./routes/clientes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/clientes", clienteRoutes); //🔥


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
