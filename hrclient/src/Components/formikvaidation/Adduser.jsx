import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, } from 'react-router-dom';
import Login from "../Login/Login";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import mydraw from '../Adduser/images/backkk.avif'
import './Adduser.css'
import axios from "axios";

function Adduserformik() {
    const navigate = useNavigate();

    const isTokenpresent = () => {
        const token = localStorage.getItem('token');
        return !!token; 
    };

    if (!isTokenpresent()) {
        Swal.fire({
            title: "Error",
            text: "You need to login to access the adduser area.",
            icon: "error",
            button: "Login",
        }).then(() => {
            navigate('/login');
        });
        return null;
    }

    const [generatedPassword, setGeneratedPassword] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleAdduser = async (json_data, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:3100/adduser', json_data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const responseData = response.data;
            if (responseData.success) {
                setGeneratedPassword(responseData.password);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: responseData.message
                });
            } else if (responseData.errors) {
                // Handle errors from the server
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Invalid email or password"
            });
        }
        setSubmitting(false);
    };

    return (
        <div className="dataforms">
            <div className='adddata' >
                <h2>Add-User</h2>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phonenumber: '',
                        Address: '',
                        pincode: ''
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().min(3,'Too Short..').max(30,'Too Long..').required('Enter your UserName'),
                        email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Invalid email').required('Enter your Email'),
                        phonenumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Enter Your Phone Number'),
                        Address: Yup.string().required('Enter Your Address'),
                        pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Enter Your Pincode'),
                    })}
                    onSubmit={handleAdduser}
                    validateOnChange
                    validateOnBlur
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <Form className='adddetails' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Enter your UserName</label>
                                <Field type="text" name='name' placeholder="Enter Your Username" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="email">Enter your Email</label>
                                <Field type="email" name='email' placeholder="Enter Your Email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="phonenumber">Enter Your Phone Number</label>
                                <Field type="text" name="phonenumber" placeholder="Enter Your Phone Number" onChange={handleChange} onBlur={handleBlur} value={values.phonenumber} />
                                <ErrorMessage name="phonenumber" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="address">Enter Your Address</label>
                                <Field type="text" name="Address" placeholder="Enter Your Address" onChange={handleChange} onBlur={handleBlur} value={values.Address} />
                                <ErrorMessage name="Address" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="pincode">Enter Your Pincode</label>
                                <Field type="text" name="pincode" placeholder="Enter Your Pincode" onChange={handleChange} onBlur={handleBlur} value={values.pincode} />
                                <ErrorMessage name="pincode" component="div" className="error-message" />
                            </div>
                            <div className='centre'>
                                <button type="submit" disabled={isSubmitting}>Add User</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {generatedPassword && <p>Password generated: {generatedPassword}</p>}
            </div>
            <div className="mydraw">
                <img src={mydraw} alt="#" />
            </div>
        </div>
    );
}

export default Adduserformik;


