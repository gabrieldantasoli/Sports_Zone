import React from 'react';

//IMPORTANDO O CSS
import './categoriaIcon.css';

export default ({img, name}) => {

    return (
        <div className='categoriaIcon'>
            <div className='img'>
                <img src={img} alt={name} />
            </div>
            <div className="text">
                <p>{name}</p>
            </div>
        </div>
    )
}