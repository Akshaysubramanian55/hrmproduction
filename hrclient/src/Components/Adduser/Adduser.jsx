import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, } from 'react-router-dom';
import Login from "../Login/Login";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import mydraw from '../Adduser/images/backkk.avif'
import './Adduser.css'
import axios from "axios";




function Adduser() {

    const navigate=useNavigate();

    const isTokenpresent = () => {
  
        const token = localStorage.getItem('token');
        return !!token; 
      };
    
      if (!isTokenpresent()) {
        Swal.fire({
            title: "Error",
            text: "You need to login to access the aduser area.",
            icon: "error",
            button: "Login",
        }).then(() => {
            navigate('/login');
        });
        return null;
       
    }
    const [name, setName] = useState('');
    const [nameerror, setNameerror] = useState('');


    const [email, setEmail] = useState('')
    const [emailerror, setEmailerror] = useState('')

    // const [password, setPassword] = useState('');
    // const [passworderror, setPassworderror] = useState('');


    const [phonenumber, setPhonenumber] = useState('');
    const [phonenumbererror, setPhonenumbererror] = useState('');


    const [Address, setAddress] = useState('');
    const [Addresserror, setAddresserror] = useState('');


    const [pincode, setPincode] = useState('');
    const [pincodeerror, setPincodeerror] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');

    const [token, setToken] = useState('')

    useEffect(() => {

        const storedToken = localStorage.getItem('token');
        // console.log("Stored Token:", storedToken);

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);


    const validatename = (value) => {
        const nameRegex = /^[a-z]{6,}$/i;
        if (!value) {
            setNameerror('enter Name')
        } else if (!nameRegex.test(value)) {
            setNameerror('Enter valid name')
        } else {
            setNameerror('')
        }
    }

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

   

    const validatephonenumber = (value) => {
        const phoneRegex = /^[0-9]{10}$/

        if (!value) {
            setPhonenumbererror('Enter your password')
        } else if (!phoneRegex.test(value)) {
            setPhonenumbererror('Enter Valid Password')
        } else {
            setPhonenumbererror('')
        }
    }
    const validateAddress = (value) => {
        const AddressRegex = /^[a-zA-Z0-9\s.,-]{1,255}$/
        if (!value) {
            setAddresserror('enter Address');
        } else if (!AddressRegex.test(value)) {
            setAddress('invalid address')
        } else {
            setAddresserror('')
        }
    }

    const validatepincode = (value) => {
        const pincodeRegex = /^[0-9]{6}$/

        if (!value) {
            setPincodeerror('enter Pincode');
        } else if (!pincodeRegex.test(value)) {
            setPincodeerror('invalid Pincode')
        } else {
            setPincodeerror('')
        }
    }





    const handleAdduser = async (e) => {
        e.preventDefault();
        try {

            const data = { name, email, phonenumber, Address, pincode };
            const json_data = JSON.stringify(data);
            console.log("json_data : ", json_data)

            console.log("Token:", token);

            const response = await axios.post('http://localhost:3100/adduser', json_data, {

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: json_data,
            });


            const responseData =  response.data;
            console.log(responseData)
            if (responseData.errors) {

                if (responseData.errors.name || responseData.errors.name_empty) {
                    setNameerror(responseData.errors.name_empty || responseData.errors.name)
                }

                if (responseData.errors.email || responseData.errors.email_empty) {
                    setEmailerror(responseData.errors.email_empty || responseData.errors.email)
                }

                

                if (responseData.errors.phonenumber || responseData.errors.phonenumber_empty) {
                    setPhonenumbererror(responseData.errors.phonenumber_empty || responseData.errors.phonenumber)
                }

                if (responseData.errors.Address_empty) {
                    setAddresserror(responseData.errors.Address_empty)
                }

                if (responseData.errors.pincode || responseData.errors.pincode_empty) {
                    setPincodeerror(responseData.errors.pincode_empty || responseData.errors.pincode)
                    // `Validation error:\n${validationErrors}`
                } 

               
                
            }else if(responseData.success){
                const passwordFromServer = response.data.password;
                setGeneratedPassword(passwordFromServer);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.message
                });
            }
         



        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "error",
                text: "invalid email or password"
            })
        }
    }

    return (
        <div className="dataforms">

            <div className='adddata' >

                <h2>Add-User</h2>

                <form className='adddetails' onSubmit={handleAdduser}>

                    <div>
                        <label htmlFor="name">Enter your UserName</label>
                        <input type="text" placeholder="Username" name='name' value={name} onChange={(e) => { setName(e.target.value), validatename(e.target.value) }} required />
                        {nameerror && <p className="error-message">{nameerror}</p>}
                    </div>

                    <div>

                        <label htmlFor="email">Enter your Email</label>
                        <input type="email" placeholder="email" name='email' value={email} onChange={(e) => { setEmail(e.target.value); validateemail(e.target.value) }} required />
                        {emailerror && <p className="error-message">{emailerror}</p>}
                    </div>

                   
                    <div>
                        <label htmlFor="phonenumber">Enter Your Phone Number</label>
                        <input type="phonenumber" placeholder="Enter Your Phone Number" name="phonenumber" value={phonenumber} onChange={(e) => { setPhonenumber(e.target.value); validatephonenumber(e.target.value) }} required />

                        {phonenumbererror && <p className="error-message">{phonenumbererror}</p>}

                    </div>


                    <div>


                        <label htmlFor="address">Enter Your Address</label>
                        <input type="address" placeholder="Enter Your Address" name="Address" value={Address} onChange={(e) => { setAddress(e.target.value); validateAddress(e.target.value) }} required />
                        {Addresserror && <p className="error-message">{Addresserror}</p>}

                    </div>

                    <div>
                        <label htmlFor="pincode">Enter Your Pincode</label>
                        <input type="pincode" placeholder="Enter Your pincode" name="pincode" value={pincode} onChange={(e) => { setPincode(e.target.value); validatepincode(e.target.value) }} required />
                        {pincodeerror && <p className="error-message">{pincodeerror}</p>}

                    </div>




                    <div className='centre'>
                        <button type="submit" onClick={handleAdduser}>Add User</button>
                    </div>



                </form>
                {generatedPassword && <p>Password generated: {generatedPassword}</p>}
            </div>
            <div className="mydraw">
                <img src={mydraw} alt="#" />
            </div>
        </div>
    )
}

export default Adduser;