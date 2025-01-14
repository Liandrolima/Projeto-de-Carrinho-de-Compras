const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados temporários (simulando banco de dados)
let users = [];
let cart = [];

// FakeStoreAPI para produtos
app.get('/produtos', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

// Cadastro de usuário
app.post('/cadastro', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = { email, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Login de usuário
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Senha incorreta' });
    }
    const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token });
});

// Adicionar produto ao carrinho
app.post('/adicionar-carrinho', (req, res) => {
    const { id, nome, preco } = req.body.produto;
    const item = { id, nome, preco, quantidade: 1 };
    cart.push(item);
    res.json({ message: 'Produto adicionado ao carrinho!' });
});

// Visualizar carrinho
app.get('/carrinho', (req, res) => {
    res.json(cart);
});

// Finalizar compra (Notificação)
app.post('/notificar', (req, res) => {
    // Aqui poderia ser integrado a API AfterShip, mas vamos simular com um log.
    console.log('Pedido confirmado:', req.body.message);
    res.json({ message: 'Compra finalizada e notificação enviada!' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
