const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Certifique-se de que o modelo User está correto

const router = express.Router();

// Rota de Cadastro

router.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email já cadastrado." });
    if (role && !["aluno", "professor", "admin"].includes(role)) {
  return res.status(400).json({ message: "Função inválida." });
}

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Rota de Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Senha inválida." });

    // Gerar token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
