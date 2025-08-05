import { toast } from "react-toastify";
import { config } from "./config";
import axios from 'axios'


export async function GetFlightSearch(trip, from, to, dep, arr, Tclass, passenger) {

    try {
        let url = `${config.serverUrl}/search?source=${from}&destination=${to}&departure=${dep}&passengers=${passenger}&travelclass=${Tclass}&tripType=${trip}`;

        if(arr){
            url+=`&arrival=${arr}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        toast.error(err);
    }

}