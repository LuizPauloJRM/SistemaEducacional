// config.js (ou db.js)
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra o servidor se a conexão falhar
  }
};

module.exports = connectDB;
