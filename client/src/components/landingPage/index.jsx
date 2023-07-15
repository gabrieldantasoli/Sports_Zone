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
                  <button onClick={handleClick}>out</button>
                </SplideSlide>
                <SplideSlide className='slide_view'>
                    <p>slide 2</p>
                </SplideSlide>
                <SplideSlide className='slide_view'>
                    <p>slide 3</p>
                </SplideSlide>
                <SplideSlide className='slide_view'>
                    <p>slide 4</p>
                </SplideSlide>
            </Splide>

        </section>
    )
}