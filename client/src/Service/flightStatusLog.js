import axios from "axios";
import { config } from "./config";

const BASE_URL = `${config.serverUrl}/admin/flight-status-logs`;

export const getAllFlightStatusLogs = () => {
  return axios.get(BASE_URL);
};

export const addFlightStatusLog = (logData) => {
  return axios.post(BASE_URL, logData);
};
