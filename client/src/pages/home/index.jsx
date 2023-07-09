import React from 'react';
import { LandingPage, CategoriaSlide, MaisVendidos, PassBanner, LoginBar, Footer, Header } from '../../components';


//IMPORTANDO O CSS
import './home.css';

export default () => {

    return (
        <div>
            <Header />
            <LandingPage />
            <CategoriaSlide />
            <MaisVendidos />
            <PassBanner />
            <LoginBar />
            <Footer />
        </div>
    )
}