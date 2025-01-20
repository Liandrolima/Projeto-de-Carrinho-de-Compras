import axios from 'axios';

// Substitua com sua chave de API do AfterShip
const AFTERSHIP_API_KEY = 'SUA_CHAVE_API';

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
