import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams} from 'react-router-dom';
import {  useNavigate  } from 'react-router-dom';


import './AdminNavbar.css'

function AdminNavbar() {

    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
      
        localStorage.removeItem('token');
      navigate('/login'); 
    };
    return (
        <>
            <nav>
                <div className="listnav">
                    <h3>Welcome</h3>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Services</li>

                    </ul>
                    <div className="buttonss">
                        <div className="button1">
                        <Link to="/adduser"><button type="submit">Add</button></Link>
                        </div>
                        <div className="button2">
                        <Link to="/getuser"><button type="submit">Users</button></Link>

                        </div>
                        <div>
                            <Link to="/changepassword"><button>Change Password</button></Link>
                        </div>
                        <div className="button3">
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                        
                    </div>



                </div>
            </nav>
        </>
    )
}



export default AdminNavbar;