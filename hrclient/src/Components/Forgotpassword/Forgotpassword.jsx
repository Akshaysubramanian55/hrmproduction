import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert2';
import './Forgotpassword.css'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://localhost:3100/forgot-password', { email });

            setMessage(response.data.message);

            if (response.status === 200) { // Check the status property instead of statusCode
                swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Password reset link has been sent to your email"
                });
            } else {
                swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to send reset link. Please try again later."
                });
            }
        } catch (error) {
            console.error('Error:', error);
            swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to send reset link. Please try again later."
            });
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleForgotPassword}>Submit</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
