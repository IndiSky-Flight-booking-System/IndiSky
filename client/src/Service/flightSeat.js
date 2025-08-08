import { toast } from "react-toastify";
import axios from "axios";
import { config } from "./config"; 

export async function getSeatsByFlightId(flightId) {
  try {
    const url = `${config.serverUrl}/api/flights/${flightId}/seats`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch seat data");
    return [];
  }
}
