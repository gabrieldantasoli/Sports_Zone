import React from 'react';

//IMPORTANDO O CSS
import './item.css';

export default ({produto}) => {

    return (
        <div className='maisVendidos'>
                <a href={`/product/${produto._id}`}>
                <div className='img'>
                    <img src={produto.img_preview} alt="Product" />
                </div>
            </a>
            
        </div>
    )
}