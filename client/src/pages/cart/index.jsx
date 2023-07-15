import React, { useContext, useEffect, useState } from 'react';

//IMPORTANDO O CSS
import './cart.css';
import { Header } from '../../components';
import { json, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { Login_img } from '../../imgs';
import { toast } from 'react-toastify';
import axios from 'axios';


export default () => {

    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);

    const getUserCartProducts = async () => {
        if (user != null) {
            try {
                const res = await axios.get(`/cart/${user._id}`);
                setProducts(res.data)
            } catch (err) {
                toast.error(err.message);
            }
        }
    }

    useEffect(() => {
        getUserCartProducts();
    }, []);

    return (
        <section className='cart'>
            <Header />
            { user ? (
                <div className='shoppings'>
                    
                </div>
            ) : (
                <div >
                    <div className="notLogged">
                        <img src={Login_img} alt="gif login icon" />
                        <div className="authenticate">
                            <h3>You are not authenticated!</h3>
                            <a href="/login">Login to see you cart.</a>
                        </div>
                        
                    </div>
                </div>
                
            )}
        </section>
    )
}