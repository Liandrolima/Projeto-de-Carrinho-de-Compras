import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Substitua pela sua chave de API do AfterShip
const AFTERSHIP_API_KEY = 'SUA_CHAVE_API_DO_AFTERSHIP';

// Função para enviar notificação de confirmação de pedido via AfterShip
const sendConfirmationNotification = async (orderDetails) => {
    const notificationData = {
        tracking: {
            title: 'Pedido Confirmado',
            body: `Seu pedido com o ID ${orderDetails.orderId} foi confirmado com sucesso!`,
            customer_name: orderDetails.customerName,
            order_id: orderDetails.orderId,
            status: 'confirmed',
            created_at: new Date().toISOString(),
        }
    };

    try {
        const response = await axios.post('https://api.aftership.com/v4/notifications', notificationData, {
            headers: {
                'aftership-api-key': AFTERSHIP_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log('Notificação enviada com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao enviar notificação:', error.response ? error.response.data : error.message);
    }
};

// Endpoint para simular a finalização de um pedido
app.post('/finalizar-pedido', (req, res) => {
    const { orderId, customerName } = req.body;

    if (!orderId || !customerName) {
        return res.status(400).json({ message: 'Faltam dados do pedido' });
    }

    const orderDetails = {
        orderId,
        customerName
    };

    // Envia a notificação
    sendConfirmationNotification(orderDetails);

    return res.status(200).json({
        message: `Pedido ${orderId} finalizado. Notificação de confirmação enviada.`
    });
});

// Porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
