import { toast } from "react-toastify";
import { config } from "./config";
import axios from 'axios';

export async function createBooking(bookingPayload) {
  try {
    const url = `${config.serverUrl}/api/bookings`;
    const response = await axios.post(url, bookingPayload);
    toast.success("Booking created successfully!");
    return response.data;
  } catch (error) {
    toast.error("Booking creation failed!");
    console.error("Error during booking:", error);
    return null;
  }
}


export async function getBooking(id) {
  try {
    const url = `${config.serverUrl}/api/bookings/${id}/confirmation`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error during booking:", error);
  }
}
