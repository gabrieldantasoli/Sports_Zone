import React from 'react';

//IMPORTANDO O CSS
import './footer.css';

export default () => {

    return (
        <section className='footerSection'>
            <div className="back_begin">
                <a href="#begin">voltar ao inicio</a>
            </div>
            <div className="info">
                <div className="info1">
                    <p>Condições de Uso | Notificação de Privacidade | Cookies | Anúncios Baseados em Interesses </p>
                    <p>© 2023 Sport_Zone.com</p>
                </div>
                <div className="info2">
                    <p>Av. Tofu Hayafel, 204, Torre E, 34° andar - Curitiba CEP: 27482-374 | Fale conosco| ajuda-sport_zone@sptzn.com.br</p>
                    <p>Formas de pagamento aceitas: cartões de crédito (Visa, MasterCard, Elo e American Express), cartões de débito (Visa e Elo), Boleto e Pix.</p>
                </div>
            </div>
        </section>
    )
}