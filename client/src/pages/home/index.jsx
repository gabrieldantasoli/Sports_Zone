import React, { useContext } from 'react';
import { LandingPage, CategoriaSlide, MaisVendidos, PassBanner, LoginBar, Footer, Header, ViewsSlider } from '../../components';

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
            <ViewsSlider />
            <Footer />
        </div>
    )
}