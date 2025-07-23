import { toast } from "react-toastify";
import axios from "axios"

export async function addPassenger(passengerlist){
    try {
        // const url 
        const resp=await axios.post(url,passengerlist);
        return resp.data
    } catch (err) {
        toast.error(err);
    }
}