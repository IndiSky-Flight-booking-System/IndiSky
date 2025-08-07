import axios from 'axios';
import { config } from './config';

const BASE_URL = `${config.serverUrl}/api/payments`;

export const getPaymentsByUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user`, {
    params: { userId },
  });
  return response.data;
};
