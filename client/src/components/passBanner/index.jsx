import React, { useContext, useState } from 'react';
import { Tenis_img, Academia_img, Basquete_img, Corrida_img, Futebol_img, Piscinas_img } from '../../imgs';
import axios from "axios";
import { AuthContext } from '../../context/authContext';
import { toast } from "react-toastify";

//IMPORTANDO O CSS
import './pass.css';

export default () => {

    const { user } = useContext(AuthContext);

    const changePass = async () => {
        const changePass = {
            pass: !user.pass,
            people_pass: qtdPessoas
        }
        try {
            await axios.put(`/user/${user._id}`, changePass);
            toast.success("ok")
        } catch (err) {
            toast.error(err.message);
        }
    }

    const [qtdPessoas, setQtdPessoas] = useState(1);

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
            <div className="form">
                <p>* Planos a partir de R$75 / Pessoa</p>
                { user != null ? (
                    <div>
                        { user.pass == true ? (
                            <div>
                                <button onClick={changePass}>Cancelar Assinatura</button>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="qtd">Pessoas : </label>
                                <input type="number" min={1} name="qtd" value={qtdPessoas} onChange={(e) => setQtdPessoas(e.target.value)} id="qtd" />
                                <button onClick={changePass}>Assinar</button>
                            </div>
                        )}
                    </div>
                    
                ) : (<></>)}
            </div>
        </section>
    )
}