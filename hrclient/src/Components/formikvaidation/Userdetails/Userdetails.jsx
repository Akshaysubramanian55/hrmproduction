import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../Userdetails/Userdetails.css';
import myback from '../Userdetails/images/listimage.avif';

function Userdetailsformik() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [readOnly, setReadOnly] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3100/getuser/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Enter Your Name'),
        email: Yup.string().email('Invalid email').required('Enter Your Email'),
        phonenumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Enter Your Phone Number'),
        Address: Yup.string().required('Enter Your Address'),
        pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Enter Your Pincode'),
    });

    const handleUpdate = async (values) => {
        try {
            await axios.put(`http://localhost:3100/updateuser/${userId}`, values);
            console.log("Data Updated Successfully")
        } catch (error) {
            console.log("Updating User Failed", error)
        }
    };

    return (
        <div className="totally">
            <div className="imagee">
                <img src={myback} alt="#" />
            </div>
            <div>
                <div className="formss">
                    <Formik
                        initialValues={{
                            name: user.name,
                            email: user.email,
                            phonenumber: user.phonenumber,
                            Address: user.Address,
                            pincode: user.pincode
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdate}
                        validateOnChange
                        validateOnBlur
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name">Enter Your Name</label>
                                    <Field type="text" name="name" readOnly={readOnly} onChange={handleChange} onBlur={handleBlur} value={values.name} />
                                    <ErrorMessage name="name" component="div" className="error-message" />
                                </div>
                                <div>
                                    <label htmlFor="email">Enter Your Email</label>
                                    <Field type="email" name="email" readOnly={readOnly} onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>
                                <div>
                                    <label htmlFor="phonenumber">Enter Your Phone Number</label>
                                    <Field type="text" name="phonenumber" readOnly={readOnly} onChange={handleChange} onBlur={handleBlur} value={values.phonenumber} />
                                    <ErrorMessage name="phonenumber" component="div" className="error-message" />
                                </div>
                                <div>
                                    <label htmlFor="address">Enter Your Address</label>
                                    <Field type="text" name="Address" readOnly={readOnly} onChange={handleChange} onBlur={handleBlur} value={values.Address} />
                                    <ErrorMessage name="Address" component="div" className="error-message" />
                                </div>
                                <div>
                                    <label htmlFor="pincode">Enter Your Pincode</label>
                                    <Field type="text" name="pincode" readOnly={readOnly} onChange={handleChange} onBlur={handleBlur} value={values.pincode} />
                                    <ErrorMessage name="pincode" component="div" className="error-message" />
                                </div>
                                <div className="buttonss">
                                    <div className="button1">
                                        <button type="submit">Submit</button>
                                    </div>
                                    <div className="button2">
                                        <button type="button" onClick={() => setReadOnly(prevState => !prevState)}>{readOnly ? 'Edit' : 'Cancel'}</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Userdetailsformik;
