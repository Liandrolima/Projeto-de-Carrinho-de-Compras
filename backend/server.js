import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'fallback_secret_key';
const AFTERSHIP_API_KEY = process.env.AFTERSHIP_API_KEY; // Agora utilizando a variável de ambiente

// Configuração para o body-parser
app.use(bodyParser.json());

// Usuários simulados (substitua por um banco de dados real)
const users = [
    { id: 1, email: 'user1@example.com', password: bcrypt.hashSync('senha123', 10) },
    { id: 2, email: 'user2@example.com', password: bcrypt.hashSync('senha456', 10) }
];

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

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido.', token });
});

// Rota para obter os produtos (exemplo)
app.get('/produtos', authenticate, (req, res) => {
    console.log('Rota /produtos foi chamada'); // Log para depuração

    const produtos = [
        { id: 1, nome: 'Produto 1', preco: 100 },
        { id: 2, nome: 'Produto 2', preco: 200 },
    ];

    console.log('Produtos:', produtos); // Exibe os produtos no console para depuração

    res.status(200).json({ produtos });
});

// Função para enviar a notificação de confirmação de pedido via AfterShip API
const sendOrderConfirmationNotification = async (orderId, email) => {
    try {
        const response = await axios.post(
            'https://api.aftership.com/v4/notifications',
            {
                notification: {
                    emails: [email],
                    events: ['order_confirmed'],
                    order_id: orderId,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'aftership-api-key': AFTERSHIP_API_KEY,
                },
            }
        );

        console.log('Notificação de pedido enviada:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        throw error;
    }
};

// Endpoint de exemplo para confirmação de pedido
app.post('/confirmar-pedido', authenticate, async (req, res) => {
    const { orderId, email } = req.body;

    if (!orderId || !email) {
        return res.status(400).json({ message: 'ID do pedido e e-mail são obrigatórios.' });
    }

    try {
        // Chama a função para enviar a confirmação do pedido
        const notificationResponse = await sendOrderConfirmationNotification(orderId, email);
        res.status(200).json({ message: 'Pedido confirmado e notificação enviada!', data: notificationResponse });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar pedido e notificação', error: error.message });
    }
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor.' });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
