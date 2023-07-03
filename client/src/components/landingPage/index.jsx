import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

//IMPORTANDO O CSS
import './landingPage.css';

export default () => {

    return (
        <section className='landingPage full_window'>
            <Splide className='slide' options={{ rewind: true, gap: '1rem', hasSliderWrapper: true, hasAutoplayProgress: true,}}>
                <SplideSlide className='slide_view'>
                    <p>slide 1</p>
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