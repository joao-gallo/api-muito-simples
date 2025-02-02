const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.get("/", clienteController.getClientes); // Buscar todos os clientes
router.post("/", clienteController.createCliente); // Criar um cliente
router.put("/:id", clienteController.updateCliente); // Atualizar cliente
router.delete("/:id", clienteController.deleteCliente); // Deletar cliente

module.exports = router;
