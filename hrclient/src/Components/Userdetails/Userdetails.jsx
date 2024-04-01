import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, } from 'react-router-dom';
import axios from 'axios';
import '../Userdetails/Userdetails.css'
import myback from '../Userdetails/images/listimage.avif'

function Userdetails() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [readOnly, setReadOnly] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3100/getuser/${userId}`);
                setUser(response.data); // Assuming response.data contains user details
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
const Togglereadonly=()=>{
    setReadOnly(prevState => !prevState);
}

const HandleUpdate= async() => {
try {
    
    await axios.put(`http://localhost:3100/updateuser/${userId}`,user);
    console.log("Data Updated Successfully")
} catch (error) {
    console.log("Updating User Failer",error)
}
}
    return (

        <div className="totally">

            <div className="imagee">
                <img src={myback} alt="#" />
            </div>
            <div>
                <div className="formss">

                    <div >
                        <label htmlFor="name"  >Enter Your Name</label>
                        <input type="text" name="name" defaultValue={user ? user.name : ''} readOnly={readOnly}  onChange={(e)=>setUser({...user,name:e.target.value})} />
                    </div>

                    <div>
                        <label htmlFor="mail">Enter your Name</label>
                        <input type="mail" name="name" defaultValue={user ? user.email : ''} readOnly={readOnly} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="phonenumber">Enter Your phonenumber</label>
                        <input type="phonenumber" name="phonenumber" defaultValue={user ? user.phonenumber : ''} readOnly={readOnly} onChange={(e)=>setUser({...user,phonenumber:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="address">Enter Your address</label>
                        <input type="address" name="address" defaultValue={user ? user.Address : ''} readOnly={readOnly}  onChange={(e)=>({...user,Address:e.target.value})} />
                    </div>

                    <div>
                        <label htmlFor="pincode">Enter Your pincode</label>
                        <input type="pincode" name="pincode" defaultValue={user ? user.pincode : ''} readOnly={readOnly}  onChange={(e)=>({...user,pincode:e.target.value})} />
                    </div>

                    <div className="buttonss">
                        <div className="button1">
                            <Link to="/getuser"><button type="submit" onClick={HandleUpdate}>Submit</button></Link>

                        </div>
                        <div className="button2">
                           <button type="submit" onClick={Togglereadonly}>Edit</button>

                        </div>
                      
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Userdetails;