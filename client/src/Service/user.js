
import { config } from './config';
import axios from 'axios'


export async function RegisterBody( full_name, email, password, phone_no, dob, passport_no) {
    try {

        const url = `${config.serverUrl}/api/user`

        const body = {
            fullName :full_name,
            email,
            password,
            phoneNo : phone_no,
            birthDate : dob,
            passportNo :passport_no
        }

        const response = await axios.post(url, body);
        return response
    } catch (ex) {
        console.log(ex);
    }
}