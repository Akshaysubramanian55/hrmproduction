import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams} from 'react-router-dom';
import {  useNavigate  } from 'react-router-dom';


import './UserNavbar.css'

function UserNavbar() {

    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
      // Perform logout actions
      // For example, clearing session, etc.
      navigate('/login'); // Navigate to the login page
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



export default UserNavbar;