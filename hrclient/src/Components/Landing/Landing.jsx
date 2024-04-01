import Landingnavbar from "./Landingnavbar/Landingnavbar";
import Landingfooter from "./Landingfooter/Landingfooter";
import Login from "../Login/Login";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import myimage from "../Landing/images/hero-carousel-3.svg"
import './Landing.css'



function Landingpage() {
    return (
        <>
            <Landingnavbar />
            <div className="landinggpage">

                <div>
                    <img src={myimage} alt="#" />
                </div>
                <div>
                    <h1>WELCOME</h1>
                </div>

                <div className="lorem">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, in!</p>
                </div>

                <div>
                <div className="started">
                    <h2>Get Started</h2>
                </div>
                </div>
            </div>

            

            <Landingfooter />
        </>
    )

}
export default Landingpage;