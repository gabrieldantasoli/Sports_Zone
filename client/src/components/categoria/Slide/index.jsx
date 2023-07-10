import React, { useEffect, useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import CategoriaIcon from '../Icon';

//IMPORTANDO O CSS
import './categoriaSlide.css';
import axios from 'axios';
import { toast } from 'react-toastify';


export default () => {

    const [categorias, setCategorias] = useState([]);

    const handleClick = async () => {
        try {
            const res = await axios.get("/category");
            setCategorias(res.data);
        } catch (err) {
            toast.error("Falha ao acessar banco de dados!");
        }
    }
        
    useEffect(() => {
        handleClick();
      }, []);

    return (
        <section className='categorias'>
            <h2>Navegue por categorias :</h2>
            <div className="categoriaSlide">
                {categorias.map((categoria, index) => (
                <CategoriaIcon key={index} img={categoria.img} name={categoria.name} />
            ))}
            </div>
            
        </section>
    )
}