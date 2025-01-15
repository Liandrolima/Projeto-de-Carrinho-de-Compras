const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/shopping-cart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Modelos
const User = require('./models/User');
const Product = require('./models/Product');

// Rotas
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('Usuário registrado com sucesso!');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Credenciais inválidas');
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/checkout', async (req, res) => {
    const { order } = req.body;

    try {
        const response = await axios.post(
            'https://api.aftership.com/v4/notifications',
            { order },
            { headers: { 'aftership-api-key': 'YOUR_AFTERSHIP_API_KEY' } }
        );
        res.json({ message: 'Pedido confirmado!', data: response.data });
    } catch (error) {
        res.status(500).send('Erro ao confirmar o pedido');
    }
});

app.listen(5000, () => console.log('Backend rodando na porta 5000'));
