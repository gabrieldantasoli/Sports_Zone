import React, { useContext, useEffect, useState } from 'react';
import { AdminCreateProducts, AdminUpdateProducts, Header, UserAddress, UserData, UserFavorites, UserShoppings } from "../../components";

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
                            <p>User</p>
                            <button className={action == "user_address" ? "active" : ""} onClick={() => setAction("user_address")}>User Address</button>
                            <button className={action == "user_shoppings" ? "active" : ""} onClick={() => setAction("user_shoppings")}>User Shoppings</button>
                            <button className={action == "user_data" ? "active" : ""} onClick={() => setAction("user_data")}>User Data</button>
                            <button className={action == "favorite_product" ? "active" : ""} onClick={() => setAction("favorite_product")}>Favorite Products</button>
                            { isAdmin ? (
                                <div>
                                    <hr />
                                    <p>Admin</p>
                                    <button className={action == "update_product" ? "active" : ""} onClick={() => setAction("update_product")}>Update Products</button>
                                    <button className={action == "create_product" ? "active" : ""} onClick={() => setAction("create_product")}>Create Products</button>
                                </div>
                            ) : <></> }
                        </div>
                        <div className="components">
                            { action == "" ? (
                                <div className='start'>
                                    <h3>User Area</h3>
                                    <p>Here you can update your personal data, see your shoppings and favorite products. You can also update products (if you are a Admin) .</p>
                                </div>
                            ) : <></>}
                            { action == "user_address" ? (
                                <UserAddress />
                            ) : <></> }
                            { action == "user_shoppings" ? (
                                <UserShoppings />
                            ) : <></>}
                            { action == "user_data" ? (
                                <UserData />
                            ) : <></>}
                            { action == "favorite_product" ? (
                                <UserFavorites />
                            ) : <></>}
                            { action == "update_product" ? (
                                <AdminUpdateProducts />
                            ) : <></>}
                            { action == "create_product" ? (
                                <AdminCreateProducts />
                            ) : <></>}
                        </div>
                    </div>
                </section>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}
