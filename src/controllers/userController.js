const pool = require("../config/sequelize");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

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

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (!user.checkPassword(password)) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, user });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ message: "Erro ao fazer login" });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };
