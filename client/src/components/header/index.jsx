import React, { useState, useEffect, useContext } from 'react';
import { Logo_img } from '../../imgs';
import { HiLocationMarker } from 'react-icons/hi';
import { BiSearchAlt, BiCart } from 'react-icons/bi';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';

// IMPORTING THE CSS
import './header.css';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default () => {

    const { user } = useContext(AuthContext);

    const [categorias, setCategorias] = useState([]);
    const [elementosVisiveis, setElementosVisiveis] = useState([]);
    const [qtdItemsInCart, setQtdItemsInCart] = useState(0);

    const removeItens = () => {
        const largura = window.innerWidth;
        const totalWidth = largura - 450;
        const nav = document.getElementById('nav');
        const list = nav.querySelector('ul');
        const tempList = Array.from(list.children);
        
        if (nav.offsetWidth > totalWidth) {
            while (nav.offsetWidth > totalWidth && tempList.length > 0) {
            const lastElement = tempList.pop();
            list.removeChild(lastElement);
            }
        } else if (totalWidth - nav.offsetWidth > 100) {
            const maxVisibleElements = Math.floor(totalWidth / 100);
            while (totalWidth - nav.offsetWidth > 100 && tempList.length < categorias.length && tempList.length < maxVisibleElements) {
            const firstElementText = categorias[tempList.length];
            const novoLiElement = document.createElement('li');
            novoLiElement.textContent = firstElementText;
            list.appendChild(novoLiElement);
            tempList.push(novoLiElement);
            }
        }
        
        setCategorias(tempList.map((element) => element.textContent));
    };

    const handleClick = async () => {
        try {
            const res = await axios.get("/category");
            const arrayCategorys = res.data;
            await setElementosVisiveis(arrayCategorys);
        } catch (err) {
            toast.error("Falha ao acessar banco de dados!");
        }
    }

    const getQtdCompras = async () => {
        if (user != null) {
            try {
                const res = await axios.get(`/cart/count/${user._id}`)
                setQtdItemsInCart(res.data)
            } catch (err) {
                toast.error("Falha ao acessar banco de dados!");
            }
        }
    }
        
    useEffect(() => {
        handleClick();
        setTimeout(() => removeItens(), 2000);
        window.addEventListener('resize', removeItens);
        getQtdCompras();
        return () => {
          window.removeEventListener('resize', removeItens);
        };
      }, []);

    window.addEventListener('load', () => {window.addEventListener('resize', removeItens);})

    return (
        <div className='mainHeader' id='begin'>
            <div className="top">
                <div className="logo">
                    <a href="/"><img src={Logo_img} alt='Sport-Zone Logo' /></a>
                </div>
                <div className="location">
                    <HiLocationMarker />
                    { user == null ? (
                        <div className="to">
                            <a href='/login'>Enviar para...</a>
                        </div>
                    ) : (
                        <div className="to">
                        <a href='/userpage'>Enviar para...</a>
                    </div>
                    ) }
                </div>
                <div className="mainHeaderSearch">
                    <input type="text" name="search" id="search" placeholder='Pesquisar em Sport_Zone' />
                    <button id='search-button'>
                        <BiSearchAlt />
                    </button>
                </div>
                <div className="isLogged">
                    <div>
                        { user ? (
                            <a href="/userpage">{ user.username.split()[0].slice(0,10) }</a>
                        ) : (
                            <a href="/login">
                                <span className='small-write'>Olá, faça seu login</span>
                            </a>
                        )}
                        
                        
                    </div>
                </div>
                <div className="cart">
                    <a href="/cart">
                        <BiCart />
                        <span className="cart-number">{qtdItemsInCart > 9 ? "9+" : qtdItemsInCart}</span>
                    </a>
                    
                </div>
            </div>
            <div className="bottom">
                <div className="classes">
                    <button id='mainHeader-all-button'>
                        <FaListUl /> <p className='all'>Todos</p>
                    </button>
                    <nav id='nav'>
                        <ul>
                            {elementosVisiveis.map((elemento, index) => (
                                <a href={`/category/${elemento.link}`} key={index}><li key={index}>{elemento.name}</li></a>
                            ))}
                        </ul>
                    </nav>
                </div>
                
                <div className='favorite'>
                    <div>Seu favorito : <span className='promo-red'>35% OFF</span></div>
                    <div className='time'><span id='hours'>12</span> : <span id="minutes">00</span> : <span id="seconds">00</span></div>
                </div>

                <div className="isLogged">
                    <div>
                        { user ? (
                            <a href="/userpage">{ user.username.split()[0].slice(0,10) }</a>
                        ) : (
                            <a href="/login">
                                <span className='small-write'>Login</span>
                            </a> 
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};