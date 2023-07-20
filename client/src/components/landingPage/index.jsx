import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

//IMPORTANDO O CSS
import './landingPage.css';

export default () => {

    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
    }

    return (
        <section className='landingPage full_window' id="landingP">
            <Splide className='slide' options={{ rewind: true, gap: '1rem', hasSliderWrapper: true, hasAutoplayProgress: true,}}>
                <SplideSlide className='slide_view'>
                    <p>Explore nature with great equipment</p>
                </SplideSlide>
                <SplideSlide className='slide_view'>
                    <p>supplement your diet and improve your results</p>
                </SplideSlide>
                <SplideSlide className='slide_view'>
                    <p>Subscribe to the sport zone pass and enjoy incredible benefits</p>
                </SplideSlide>
                <SplideSlide className='slide_view'>
                    <p>Use the best sports equipment</p>
                </SplideSlide>
            </Splide>

        </section>
    )
}