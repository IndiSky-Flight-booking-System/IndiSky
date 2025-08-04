
import { config } from './config';
import axios from 'axios'


export async function RegisterBody(role, full_name, email, password, phone_no, dob, passport_no) {
    try {

        const url = `${config.serverUrl}/user`

        const body = {
            personRole : role,
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