import React from 'react';

//IMPORTANDO O CSS
import './item.css';

export default ({img}) => {

    return (
        <div className='maisVendidos'>
            <div className='img'>
                <img src={img} alt="Product" />
            </div>
        </div>
    )
}