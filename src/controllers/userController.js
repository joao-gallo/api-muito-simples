const pool = require("../config/sequelize");
const User = require("../models/User");


// Buscar todos os usuários
const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Users");
        res.json(result.rows);
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

module.exports = { getUsers, createUser };
