import React, { useEffect, useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Icon from '../item';

//IMPORTANDO O CSS
import './slide.css';
import axios from 'axios';
import { toast } from 'react-toastify';


export default () => {
    const [produtos, setProdutos] = useState([]);

    const handleClick = async () => {
        try {
            const res = await axios.get("/product");
            const sortedProducts = res.data.sort((a, b) => b.sold - a.sold);
            const limitedProducts = sortedProducts.slice(0,15);
            setProdutos(limitedProducts);
        } catch (err) {
            toast.error("Falha ao acessar banco de dados!");
        }
    }
        
    useEffect(() => {
        handleClick();
      }, []);

    return (
        <section className='categorias'>
            <h2>Mais Vendidos :</h2>
            <div className="categoriaSlide">
                {produtos.map((produto, index) => (
                <Icon key={index} img={produto.img_preview} />
            ))}
            </div>
            
        </section>
    )
}