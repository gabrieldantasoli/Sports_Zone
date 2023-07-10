import React, { useContext } from 'react';

//IMPORTANDO O CSS
import './loginBar.css';
import { AuthContext } from '../../context/authContext';

export default () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            { user ? (
                <div></div>
            ) : (
                <div className='loginBar'>
                    <p>Veja recomendações personalizadas</p>
                    <a href="/login" className='button-login'>Faça seu login</a>
                    <p className="small">Cliente novo? <a href="/register">Comece aqui.</a> </p>
                </div>
            )};
        </div>

        
        
    )
}