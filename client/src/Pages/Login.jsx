import {React,useContext,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { LoginBody } from '../services/user'
import { toast } from 'react-toastify'
// import { UserContext } from '../App'

function Login() {
    const [info, setInfo] = useState({
        email: '',
        password: ''
    })

    // const {setUser} =useContext(UserContext)
    const navigate = useNavigate()

    async function onLogin() {
        if (info.email.length == 0) {
            toast.error("Email cannot be Empty")
        }
        else if (info.password.length == 0) {
            toast.error("Password cannot be Empty")
        }
        else {
            const { email, password } = info
            // const result = await LoginBody( email, password);
            // console.log(result.data)
            // if (result.status == 'success') {
                // const {token , full_name,phone_no,email,password,dob,passport_no}=result.data
            //     sessionStorage.setItem('token',token)
            //     sessionStorage.setItem('full_name',full_name)
                // sessionStorage.setItem('phone_no',phone_no)
                // sessionStorage.setItem('email',email)
                // sessionStorage.setItem('password',password)
                // sessionStorage.setItem('dob',dob)
                // sessionStorage.setItem('passport_no',passport_no)
                // setUser({full_name,email,password,phone_no,dob,passport_no});
                navigate('/home')
                toast.success("Welcome to Flightize")
            // } else {
            //     toast.error(result.error)
            // }

        }
    }



    return (
        <div>
            <div className="container">
                <br />
                <h1 style={{ textAlign: 'center ', margin: '10px' }}>User Login</h1>

                <hr />
                <br />
                <div className="row">
                    <div className="col"></div>

                    <div className="col">

                        <div className="form-group m-2">
                            <label >Email </label>
                            <input type="email" className="form-control"
                                onChange={(e) => {
                                    setInfo({ ...info, email: e.target.value })
                                }}
                                placeholder="virat@gmail.com" />
                        </div>

                        <div className="form-group m-2">
                            <label >Password</label>
                            <input type="password" className="form-control"
                                onChange={(e) => {
                                    setInfo({ ...info, password: e.target.value })
                                }}
                                placeholder="Password " />
                        </div>

                        <div className='text-center'>
                            <h6>Didn't Registered ? <Link to='/reg'>Register here</Link></h6>
                            <button type="button" className="btn btn-success btn-block" onClick={onLogin}>Login</button>
                        </div>


                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}

export default Login
