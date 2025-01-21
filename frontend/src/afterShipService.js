import axios from 'axios';

// Substitua com sua chave de API do AfterShip, se necessário, ou pegue de um arquivo de ambiente
const AFTERSHIP_API_KEY = process.env.AFTERSHIP_API_KEY || 'asat_3368131e1c9e4d4b9167efca9c152cc1';

const sendOrderConfirmation = async (orderId, email) => {
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

    console.log('Notificação enviada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    throw error;
  }
};

export default sendOrderConfirmation;
