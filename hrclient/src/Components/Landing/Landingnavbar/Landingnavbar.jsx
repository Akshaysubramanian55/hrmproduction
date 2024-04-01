import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Landingnavbar.css'

function Landingnavbar() {
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
                        <li><button><Link to={"/login"}>Login</Link></button></li>
                    </ul>


                </div>
            </nav>
        </>
    )
}


export default Landingnavbar;