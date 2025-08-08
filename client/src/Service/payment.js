import { toast } from "react-toastify";
import axios from "axios";
import { config } from "./config";

export async function makePayment(paymentData) {
  try {
    const url = `${config.serverUrl}/api/payments`; // Adjust endpoint if different
    const response = await axios.post(url, paymentData);

    toast.success("Payment successful!");
    return response.data;
  } catch (error) {
    console.error("Payment failed:", error.response?.data || error.message);
    toast.error(
      error.response?.data?.message || "Payment failed. Please try again."
    );
    return null;
  }
}
