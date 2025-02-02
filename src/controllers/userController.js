const pool = require("../config/sequelize");
const User = require("../models/User");


// Buscar todos os usuários
const getUsers = async (req, res) => {
    try {
        const result = await User.findAll();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar usuários" });
    }
};

// Criar um novo usuário
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password }); // 🔥 Usando Sequelize para criar
        res.status(201).json(user);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Erro ao criar usuário" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        await user.update({ name, email, password });

        res.json(user);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id); 
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        await user.destroy(); 

        res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Erro ao deletar usuário" });
    }
};



module.exports = { getUsers, createUser, updateUser, deleteUser };
