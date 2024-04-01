import React, { useEffect, useState } from "react";
import axios from "axios";
import './Resetpassword.css';

function Resetpassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        setToken(token);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.patch('http://localhost:3100/reset-password', { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                setErrorMessage(response.data.message);
            } else {
                setErrorMessage("Failed to reset password. Please try again later.");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Failed to reset password. Please try again later.");
        }
    };

    return (
        <>
            <h1>Reset Account Password</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="password">
                        <input type="password" id="password" name="password" required placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="confirm">
                        <input type="password" id="confirmpassword" name="confirmpassword" required placeholder="Confirm Your Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="submit">
                        <button>Submit</button>
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                </form>
            </div>
        </>
    );
}

export default Resetpassword;
