import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import { Header, Loading } from '../../components';
import { Login_img } from '../../imgs';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LoadingContext } from '../../context/backendLoading';

export default () => {
  const { user } = useContext(AuthContext);
  const { loading, modifyLoad }  = useContext(LoadingContext)


  const [products, setProducts] = useState([]);
  const [linkProducts, setLinkProducts] = useState({});

  const getUserCartProducts = async () => {
    modifyLoad({ type: "LOADING_START" }); 
    if (user != null) {
      try {
        const res = await axios.get(`/cart/${user._id}`);
        setProducts(res.data);
      } catch (err) {
        toast.error(err.message);
      }
    }
    modifyLoad({ type: "LOADING_END" }); 
  };

  const getProducts = async () => {
    modifyLoad({ type: "LOADING_START" }); 
  
    let productsLink = {};
    for (const item of products) {
      try {
        const res = await axios.get(`/product/${item.product_id}`);
        productsLink[item.product_id] = res.data;
      } catch (err) {
        toast.error(err.message);
      }
    }
    setLinkProducts(productsLink);
    modifyLoad({ type: "LOADING_END" }); 
  };
  

  const updateProductCart = async (id, qtd) => {
    modifyLoad({ type: "LOADING_START" }); 
    if (qtd == 0) {
        try {
            await axios.delete(`/cart/${id}`);
            window.location.reload();
        } catch (err) {
            toast.error(err.message);
        }
    } else {
        try {
            const data = {
                qtd: qtd
            };
            await axios.put(`/cart/${id}`,data);
            await getUserCartProducts();
            getProducts();
        } catch (err) {
            toast.error(err.message);
        }
    }
  }

  useEffect(() => {
    getUserCartProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
        <section className="cart">
            { loading ? <Loading /> : <></>}
            <Header />
            {user ? (
                <div className="shoppings">
                {Object.keys(linkProducts).map((key) => {
                    const element = linkProducts[key];
                    const product = products.find((item) => item.product_id === element._id);
                    return (
                    <div className="cartProduct" key={key}>
                        <div className="img">
                        <img src={element.img_preview} alt="product img" />
                        </div>
                        <div className="info">
                        <h4>{element.name}</h4>
                        <p>R${(element.value * (1 - element.discount / 100)).toFixed(2)}</p>
                        <div className="increment">
                            <button onClick={() => updateProductCart(product._id, product.qtd - 1)}>menos</button>
                            {product && <p>Quantidade: {product.qtd}</p>}
                            <button onClick={() => updateProductCart(product._id, product.qtd + 1)}>mais</button>
                        </div>
                        
                        </div>
                    </div>
                    );
                })}
                </div>
            ) : (
                <div>
                <div className="notLogged">
                    <img src={Login_img} alt="gif login icon" />
                    <div className="authenticate">
                    <h3>You are not authenticated!</h3>
                    <a href="/login">Login to see your cart.</a>
                    </div>
                </div>
                </div>
            )}
        </section>
    );
};  