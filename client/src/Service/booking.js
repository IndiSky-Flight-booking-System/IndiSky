// src/service/booking.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/bookings';

export const getUserBookings = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await axios.put(`${BASE_URL}/${bookingId}/cancel`);
  return response.data;
};
