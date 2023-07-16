import React, { useContext, useEffect, useState } from 'react';
import { Header } from "../../components";

// IMPORTING THE CSS
import './userPage.css';
import { AuthContext } from '../../context/authContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default () => {

    const { user } = useContext(AuthContext);

    const [action, setAction] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const set = async () => {
            try {
                const res = await axios.get(`/user/${user._id}`);
                setIsAdmin(res.data.isAdmin)
            } catch (err) {
                console.log(err.message);
            }
        }
        set();
    }, []);

    return (
        <>
            {user != null ? (
                <section className='userPage'>
                    <Header />
                    <div className="userArea">
                        <div className="commands">
                            <button onClick={() => setAction("user_address")}>User Address</button>
                            <button onClick={() => setAction("user_shoppings")}>User Shoppings</button>
                            <button onClick={() => setAction("user_data")}>User Data</button>
                            <button onClick={() => setAction("user_data")}>Favorite Products</button>
                            { isAdmin ? (
                                <div>
                                    <button onClick={() => setAction("product")}>Products</button>
                                </div>
                            ) : <></> }
                        </div>
                        <div className="components">
                            <p>components</p>
                        </div>
                    </div>
                </section>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}
