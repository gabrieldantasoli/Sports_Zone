import React from 'react';
import { LandingPage, CategoriaSlide, MaisVendidos, PassBanner } from '../../components';


//IMPORTANDO O CSS
import './home.css';

export default () => {

    return (
        <div>
            <LandingPage />
            <CategoriaSlide />
            <MaisVendidos />
            <PassBanner />
            <p>home</p>
        </div>
    )
}