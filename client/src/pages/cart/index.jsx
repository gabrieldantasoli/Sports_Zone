import React, { useContext } from 'react';

//IMPORTANDO O CSS
import './cart.css';
import { Header } from '../../components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { Login_img } from '../../imgs';


export default () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <section className='cart'>
            <Header />
            { user ? (
                <div className='shoppings'>
                    You are logged!
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