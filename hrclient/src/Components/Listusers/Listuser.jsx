import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, } from 'react-router-dom';

import axios from 'axios';
import './Listuser.css';
// import myImage from '../Listusers/images/icons8-male-user-50.png'
// import myMail from '../Listusers/images/icons8-mail-50.png'
// import myPhone from '../Listusers/images/icons8-phone-50.png'
import Spinner from "../Spinner/Spinner";


function Listusers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentpage, setCurrentpage] = useState(1);
    const [itemsperpage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [token, setToken] = useState('');
    const [keyword, setKeyword] = useState('');



    useEffect(() => {

        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setToken(storedToken);
        }

        console.log(token)
    }, []);

    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3100/getuser', {

                    params: {
                        page: currentpage,
                        limit: itemsperpage,
                        keyword: keyword
                    },


                    headers: {
                        'Authorization': `Bearer ${token}`,

                    },

                });
                setData(response.data.data);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (token) {
            fetchData();
        }

    }, [token, currentpage, itemsperpage, keyword]);

    const handleViewUser = (userId) => {
        if (userId !== undefined) {
            console.log("View button clicked for user ID:", userId);

        } else {
            console.error("User ID is undefined");
        }
    };

    const nextPage = () => {
        if (currentpage < totalPages) {
            setCurrentpage(currentpage + 1);
        }
    };

    const prevPage = () => {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    };

    const handleSearch = (e) => {
        const searchKeyword = e.target.value;
        setKeyword(searchKeyword); // Update the keyword state with the new search keyword
        setCurrentpage(1);
    };


    return (
        <>

            <div className="header">
                <h1>Users</h1>
                <input type="text" placeholder="Search" value={keyword} onChange={handleSearch} />
            </div>
            {/* <div className="labels">
                <div className="label">
                    <h2>Name</h2>
                </div>
                <div className="label">
                    <h2>Email</h2>
                </div>
                <div className="label phone">
                    <h2>Phone Number</h2>
                </div>
            </div> */}

            {loading ? ( // Display spinner if loading is true
                <Spinner />
            ) : (
                data.map((user) => (
                    <div className="user-card" key={user._id}>
                        <div className="user-info">
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                            <p>{user.phonenumber}</p>
                        </div>
                        <div className="action-button">
                            <Link to={`/detailsuser/${user._id}`}>
                                <button onClick={() => handleViewUser(user._id)}>View</button>
                            </Link>
                        </div>
                    </div>
                ))
            )}

            <div className="pagination">
                <button onClick={prevPage} disabled={currentpage === 1}>Prev</button>
                <span>{currentpage} of {totalPages}</span>
                <button onClick={nextPage} disabled={currentpage === totalPages}>Next</button>
            </div>
        </>
    );
}


export default Listusers