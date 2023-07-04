import React from 'react';
import { LandingPage, CategoriaSlide, MaisVendidos } from '../../components';


//IMPORTANDO O CSS
import './home.css';

export default () => {

    return (
        <div>
            <LandingPage />
            <CategoriaSlide />
            <MaisVendidos />
            <p>home</p>
        </div>
    )
}