const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

app.post('/api/dados', (req, res) => {
    const { nome, idade } = req.body;
    console.log(`Nome: ${nome}, Idade: ${idade}`);
    res.json({ message: 'Dados recebidos com sucesso!' });
  });
  

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
