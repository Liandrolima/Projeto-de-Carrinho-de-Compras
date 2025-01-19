const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Configuração para o body-parser
app.use(bodyParser.json());

// Usuários simulados (em vez de usar banco de dados)
const users = [
    { id: 1, email: 'user1@example.com', password: bcrypt.hashSync('senha123', 10) },
    { id: 2, email: 'user2@example.com', password: bcrypt.hashSync('senha456', 10) }
];

// Chave secreta para o JWT
const SECRET_KEY = 'sua_chave_secreta_segura';

// Middleware de autenticação
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acesso negado! Faça login.' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

// Rota de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validações básicas
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Verificar se o usuário existe
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Gerar um token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido.', token });
});

// Rota para acessar produtos (apenas usuários autenticados)
app.get('/produtos', authenticate, (req, res) => {
    const produtos = [
        { id: 1, nome: 'Produto 1', preco: 100 },
        { id: 2, nome: 'Produto 2', preco: 200 }
    ];

    res.status(200).json({ message: 'Produtos disponíveis:', produtos });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
