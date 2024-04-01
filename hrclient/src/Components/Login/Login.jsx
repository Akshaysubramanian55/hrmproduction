import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import myDraw2 from '../Login/images/draw2.webp'
import './Login.css';
import Swal from 'sweetalert2';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailerror, setEmailerror] = useState('');
    const [passworderror, setPassworderror] = useState('')
    const navigate = useNavigate();

    const validateemail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
            setEmailerror('please enter your email')
        } else if (!emailRegex.test(value)) {
            setEmailerror("invalid Mail")
        } else {
            setEmailerror('')
        }
    }
    const validatepassword = (value) => {
        const passwordRegex = /^.{6,}$/

        if (!value) {
            setPassworderror('Enter your password')
        } else if (!passwordRegex.test(value)) {
            setPassworderror('Enter Valid Password')
        } else {
            setPassworderror('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            if (!email) {
                setEmailerror('Please enter your email');
            }
            if (!password) {
                setPassworderror('Please enter your password');
            }
            return;
        }
        if (emailerror || passworderror) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3100/login', {
                email: email,
                password: password,

            }, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }

            });






            if (response.data.success) {

                const { token, lastLogin,user_type} = response.data.data;
                // const token = response.data.data;
                localStorage.setItem('token', token);


            const userTypemap={
                '65e9927f96df220728517705':'admin',
                '65e9929396df220728517706':'employee'
            }

            const usertype=userTypemap[user_type]


                
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (!lastLogin) {
                            navigate('/changepassword');
                        } else {
                            navigate(usertype === 'admin' ? '/admin' : '/user');
                            
                        }
                    }
                });
            
           

        } else {
            Swal.fire({
                icon: "error",
                title: "error",
                text: "invalid email or password"
            })
        }
    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "error",
            text: "invalid email or password"
        })
    }
};





return (

    <div className='loginform'>

        <div className='loginimage'>
            <img src={myDraw2} alt="#" />
        </div>

        <div className='logindataa' >

            <h2>Login</h2>
            <form className='landinglogins' onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="name">Enter your email</label>
                    <input type="email" placeholder="email" name='email' value={email} onChange={(e) => { setEmail(e.target.value); validateemail(e.target.value) }} />

                    {emailerror && <p className="error-message">{emailerror}</p>}
                </div>
                <div>
                    <label htmlFor="password">Enter Your Password</label>
                    <input type="password" placeholder="Password" name='password' value={password} onChange={(e) => { setPassword(e.target.value); validatepassword(e.target.value) }} />
                    {passworderror && <p className="error-message">{passworderror}</p>}
                </div>



                <div className='centre'>
                    <button type='submit'>Login</button>
                </div>

                <div>
                    <Link to="/forgotpassword">Forgot password</Link>
                </div>

            </form>
        </div>


    </div>


);
};

export default Login;
