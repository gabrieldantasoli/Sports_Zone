import React from 'react';

//IMPORTANDO O CSS
import './loading.css';
import { Loading_img } from '../../imgs';


export default () => {

    return (
        <div id="loading">
            <img src={Loading_img} alt="Loading image" />
        </div>
    )
}