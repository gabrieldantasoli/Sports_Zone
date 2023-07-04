import React from 'react';
import { Tenis_img, Academia_img, Basquete_img, Corrida_img, Futebol_img, Piscinas_img } from '../../imgs';

//IMPORTANDO O CSS
import './pass.css';

export default () => {

    return (
        <section className='pass_banner'>
            <h2>Sport_zone Pass</h2>
            <p>Aqui você tem acesso a varios benefícios com um único passe!</p>
            <div className='images'>
                <img src={Tenis_img} alt="Quadra de tênis" />
                <img src={Academia_img} alt="Academia imagem" />
                <img src={Basquete_img} alt="Quadra de basquete" />
                <img src={Corrida_img} alt="Pista de corrida" />
                <img src={Futebol_img} alt="Quadra de futebol" />
                <img src={Piscinas_img} alt="Piscinas" />
            </div>
            <p>* Planos a partir de R$75 / Pessoa</p>
        </section>
    )
}