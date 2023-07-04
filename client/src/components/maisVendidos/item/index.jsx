import React from 'react';

//IMPORTANDO O CSS
import './item.css';

export default ({img}) => {

    return (
        <div className='categoriaIcon'>
            <div className='img'>
                <img src={img} alt="Product" />
            </div>
        </div>
    )
}