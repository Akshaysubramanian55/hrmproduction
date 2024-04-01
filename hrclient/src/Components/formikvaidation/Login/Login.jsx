import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import myDraw2 from '../Login/images/draw2.webp'
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

function Login() {
    const navigate = useNavigate();

    return (
        <div className='loginform'>
            <div className='loginimage'>
                <img src={myDraw2} alt="#" />
            </div>
            <div className='logindataa'>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Email is required'),
                        password: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Password is required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const response = await axios.post('http://localhost:3100/login', {
                                email: values.email,
                                password: values.password,
                            });
                            
                            if (response.data.success) {
                                const { token, lastLogin, user_type } = response.data.data;
                                localStorage.setItem('token', token);

                                const userTypemap = {
                                    '65e9927f96df220728517705': 'admin',
                                    '65e9929396df220728517706': 'employee'
                                }

                                const usertype = userTypemap[user_type]

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
                                    text: "Invalid email or password"
                                })
                            }
                        } catch (error) {
                            Swal.fire({
                                icon: "error",
                                title: "error",
                                text: "Invalid email or password"
                            })
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <Form className='landinglogins'>
                            <div>
                                <label htmlFor="email">Enter your email</label>
                                <Field type="email" name="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="password">Enter Your Password</label>
                                <Field type="password" name="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>
                            <div className='centre'>
                                <button type='submit' disabled={isSubmitting}>Login</button>
                            </div>
                            <div>
                                <Link to="/forgotpassword">Forgot password</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Login;
