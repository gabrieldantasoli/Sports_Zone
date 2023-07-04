import React from 'react';

//IMPORTANDO O CSS
import './loginBar.css';

export default () => {

    return (
        <div className='loginBar'>
            <p>Veja recomendações personalizadas</p>
            <a href="/login" className='button-login'>Faça seu login</a>
            <p className="small">Cliente novo? <a href="/register">Comece aqui.</a> </p>
        </div>
    )
}