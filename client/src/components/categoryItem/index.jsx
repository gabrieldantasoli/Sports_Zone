import React from 'react';

//IMPORTANDO O CSS
import './categoryItem.css'

export default ({name, img, off}) => {

    return (
        <div className='categoryItem'>
            <img src={img} alt="product image" />
            {off >= 5 ? <p className='off'>{off}% off</p> : ""}
            <p>{name}</p>
        </div>
    )
}