import React, { useState, useEffect } from 'react';
import { Logo_img } from '../../imgs';
import { HiLocationMarker } from 'react-icons/hi';
import { BiSearchAlt, BiCart } from 'react-icons/bi';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';

// IMPORTING THE CSS
import './header.css';

export default () => {

    const [categorias, setCategorias] = useState([]);

    const removeItens = () => {
        var largura = window.innerWidth;
        var totalWidth = largura - 450;
        var nav = document.getElementById('nav');
        var list = nav.querySelector('ul');
      
        var tempList = [];
      
        if (nav.offsetWidth > totalWidth) {
          console.log(nav.offsetWidth + ' ' + totalWidth);
          while (nav.offsetWidth > totalWidth && list.children.length > 0) {
            var lastElement = list.lastElementChild;
            var text = lastElement.textContent;
      
            tempList.push(text);
      
            lastElement.remove();
          }
          setCategorias(categorias => [...categorias, ...tempList]);
        } else {
            // console.log(nav.offsetWidth + ' ' + totalWidth);
            // tempList = categorias.slice();
            // console.log(tempList);
            // while (nav.offsetWidth <= totalWidth && tempList.length > 0) {
            //   var firstElement = tempList[0];
            //   var novoLiElement = document.createElement('li');
            //   novoLiElement.textContent = firstElement;
            //   list.appendChild(novoLiElement);
            //   tempList = tempList.slice(1);
            // }
            // setCategorias(tempList);
          }
          
      };
      
      
      useEffect(() => {
        removeItens();
      }, []);
      
      useEffect(() => {
        console.log(categorias);
      }, [categorias]);

    window.addEventListener('load', () => {window.addEventListener('resize', removeItens);})
    return (
        <div className='mainHeader'>
            <div className="top">
                <div className="logo">
                    <img src={Logo_img} alt='Sport-Zone Logo' />
                </div>
                <div className="location">
                    <HiLocationMarker />
                    <div className="to">
                        <button>Enviar para...</button>
                        <p>58.380-000</p>
                    </div>
                </div>
                <div className="mainHeaderSearch">
                    <select id="searchBy" name="searchBy">
                        <option value="all">todos os departamentos</option>
                        <option value="bicycles">Bicicletas</option>
                        <option value="food">Food</option>
                        <option value="cloutes">Roupas</option>
                    </select>
                    <input type="text" name="search" id="search" placeholder='Pesquisar em Sport_Zone' />
                    <button id='search-button'>
                        <BiSearchAlt />
                    </button>
                </div>
                <div className="isLogged">
                    <div>
                        <span className='small-write'>
                        Olá, faça seu login
                        </span>
                    </div>
                </div>
                <div className="cart">
                    <BiCart />
                    <span className="cart-number">9+</span>
                </div>
            </div>
            <div className="bottom">
                <div className="classes">
                    <button id='mainHeader-all-button'>
                        <FaListUl /> <p className='all'>Todos</p>
                    </button>
                    <nav id='nav'>
                        <ul>
                            <li>Eletrônicos</li>
                            <li>Teclados</li>
                            <li>Bicicletas</li>
                            <li>Saúdavel</li>
                            <li>Eletrônicos</li>
                            <li>Teclados</li>
                            <li>Bicicletas</li>
                            <li>Saúdavel</li>
                        </ul>
                    </nav>
                </div>
                
                <div className='favorite'>
                    <div>Seu favorito : <span className='promo-red'>35% OFF</span></div>
                    <div className='time'><span id='hours'>12</span> : <span id="minutes">00</span> : <span id="seconds">00</span></div>
                </div>

                <div className="isLogged">
                    <div>
                        <span className='small-write'>
                            Login
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
