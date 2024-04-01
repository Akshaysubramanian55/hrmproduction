import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";
import "./Changepassword.css"; 
import Swal from "sweetalert2";


function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const handleChangePassword = async (event) => {
        event.preventDefault();

        // Validate passwords
        if (newPassword !== confirmPassword) {
            setErrorMessage("New passwords do not match");
            return;
        }

        try {
            // Send request to backend to change password
            const token = localStorage.getItem("token");
            const response = await axios.patch(
                "http://localhost:3100/changepassword",
                {
                    currentpassword: currentPassword,
                    newpassword: newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Password changed successfully
            Swal.fire({
                icon:"success",
                title:"Success",
                text:response.data.message
            }).then(()=>{
                navigate('/login');
            })
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Failed to change password");
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="button">Change Password</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default ChangePassword;


