require('dotenv').config();  // Carregar as variáveis de ambiente
const express = require("express");  // Importar o express
const cors = require("cors");  // Importar o cors para permitir requisições de diferentes origens

const app = express();  // Criar a instância do app express
app.use(cors());  // Habilitar CORS
app.use(express.json());  // Permitir o envio de JSON nas requisições

// Exemplo de rota simples
app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

// Conectar ao banco de dados
const connectDB = require("./config");  // Supondo que você tenha uma configuração para o DB
connectDB();

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
