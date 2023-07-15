import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import { Header } from '../../components';
import { Login_img } from '../../imgs';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [linkProducts, setLinkProducts] = useState({});

  const getUserCartProducts = async () => {
    if (user != null) {
      try {
        const res = await axios.get(`/cart/${user._id}`);
        setProducts(res.data);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const getProducts = async () => {
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
  };

  useEffect(() => {
    getUserCartProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <section className="cart">
      <Header />
      {user ? (
        <div className="shoppings">
          {Object.keys(linkProducts).map((key) => {
            const element = linkProducts[key];
            console.log(element);
            return (
              <p key={key}>
                {key}: {element.name}
              </p>
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
