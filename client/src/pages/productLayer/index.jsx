import React, { useEffect, useState } from 'react';
import { Header } from "../../components/";

//IMPORTANDO O CSS
import './productLayer.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';


export default () => {

    const { id } = useParams();

    const [produto, setProduto] = useState({});
    const [quantidade, setQuantidade] = useState(1);
    const [activeImage, setActiveImage] = useState('');

    const handleClick = async () => {
        try {
            const res = await axios.get(`/product/${id}`);
            const produto = res.data;
            setProduto(produto);
        } catch (err) {
            toast.error("Falha ao acessar banco de dados!");
        }
    }

    const setActive = (e) => {
        const key = e.target.getAttribute('data-key');
        setActiveImage(produto.img_gallery[key]);
    }
        
    useEffect(() => {
        handleClick();
    }, []);

    useEffect(() => {
        const items = document.getElementsByClassName("itemImg");
        if (items.length > 0) {
            items[0].classList.add("active");
            Array.from(items).forEach(element => {
                element.addEventListener("mouseenter", setActive);
            });
        }
        return () => {
            Array.from(items).forEach(element => {
                element.removeEventListener("mouseenter", setActive);
            });
        };
    }, [produto]);

    return (
        <section className='product_layer'>
            <Header />

            <div className="productInfo">
                <div className="imgs">
                    <div className="imgSlide">
                        {produto.img_gallery && produto.img_gallery.map((item, index) => (
                            <div className={`itemImg ${item === activeImage ? 'active' : ''}`} key={index} data-key={index}>
                                <img src={item} alt="img slider" />
                            </div>
                        ))}
                    </div>
                    <div className="imgPreview">
                        <img className='preview' src={activeImage || produto.img_preview} alt="img" />
                    </div>
                    
                </div>
                <div className="info">
                    <div className="name">
                        <h2>{produto.name}</h2>
                        <p className='brand'>Marca: {produto.brand}</p>
                        <div className="stars">
                            <div className="content">
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                            </div>
                            <p>40 Avaliações de clientes</p>
                        </div>
                        <hr />
                    </div>
                    <div className="valor">
                        <p>Valor: R${produto.value}</p>
                        <p>Categoria: {produto.category}</p>
                    </div>
                    <hr />
                    <div className="about">
                        <p>Sobre este item</p>
                        <ul>
                            {produto.details &&
                            produto.details.split(",").map((item, index) => (
                                <li key={index}>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="buy">
                    <p className='value'><span>Valor: R$</span>{produto.value}</p>
                    <p className='entrega'><span>Entrega: </span>{produto.delivery === 0 ? "Grátis" : `R$${produto.delivery}`}  </p>
                    <p><GrLocation /> Enviar para 58380000</p>
                    <p className="estoque">Em estoque: {produto.stock}</p>
                    <div className="quantidade">
                        <label htmlFor="quantidade">Quantidade : </label>
                        <input type="number" name="quantidade" id="quantidade" value={quantidade} min={1} max={produto.stock} onChange={(e) => setQuantidade(e.target.value > produto.stock ? produto.stock : e.target.value)} />
                    </div>
                    
                    <button id='add'>Adicionar ao carrinho</button>
                    <button id='buy'>Comprar agora</button>
                    <hr />
                    <button id='fav'>Favoritar</button>
                </div>
            </div>
            <div className="perguntas">

            </div>
            <div className="avaliacoes">

            </div>
        </section>
    )
}
