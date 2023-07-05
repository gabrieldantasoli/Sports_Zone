import React from 'react';
import { LandingPage, CategoriaSlide, MaisVendidos, PassBanner, LoginBar, Footer } from '../../components';


//IMPORTANDO O CSS
import './home.css';

export default () => {

    return (
        <div>
            <LandingPage />
            <CategoriaSlide />
            <MaisVendidos />
            <PassBanner />
            <LoginBar />
            <Footer />
        </div>
    )
}