const Cliente = require("../models/cliente");
// Buscar todos os clientes
const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.status(500).json({ message: "Erro ao buscar clientes" });
    }
};

// Criar um novo cliente
const createCliente = async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const cliente = await Cliente.create({ nome, email, telefone });
        res.status(201).json(cliente);
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(500).json({ message: "Erro ao criar cliente" });
    }
};

// Atualizar um cliente pelo ID
const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        await cliente.update({ nome, email, telefone });

        res.json(cliente);
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).json({ message: "Erro ao atualizar cliente" });
    }
};

// Deletar um cliente pelo ID
const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        await cliente.destroy();

        res.json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        res.status(500).json({ message: "Erro ao deletar cliente" });
    }
};

module.exports = { getClientes, createCliente, updateCliente, deleteCliente };
