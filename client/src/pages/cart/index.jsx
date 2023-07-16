import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import { Header, Loading } from '../../components';
import { Login_img } from '../../imgs';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LoadingContext } from '../../context/backendLoading';
import { BsFillPlusCircleFill } from "react-icons/bs"
import { AiFillDelete } from "react-icons/ai";
import { BiSolidMinusCircle } from "react-icons/bi";

export default () => {
  const { user } = useContext(AuthContext);
  const { loading, modifyLoad }  = useContext(LoadingContext)


  const [products, setProducts] = useState([]);
  const [linkProducts, setLinkProducts] = useState({});
  const [total, setTotal] = useState(0);

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
            modifyLoad({ type: "LOADING_END" }); 
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
            modifyLoad({ type: "LOADING_END" }); 
        }
    }
  }

  const handleBuy = async () => {
    if (products.length > 0) {
      modifyLoad({ type: "LOADING_START" }); 
      try {
        const data = {
          "user": user._id,
        }
        const res = await axios.put("/shopping/", data); 
        const shopping_id = res.data._id;

        let someProduct = false;

        for (const item of products) {
          try {
            const dataSP = {
              "shopping": shopping_id,
              "product_id": item.product_id,
              "qtd": item.qtd,
              "unityValue": (linkProducts[item.product_id].value * (1 - linkProducts[item.product_id].discount/100)).toFixed(2)
            }
            if (item.qtd <= linkProducts[item.product_id].stock) {
              const dataUP = {
                "stock": linkProducts[item.product_id].stock - item.qtd,
                "sold": linkProducts[item.product_id].sold + item.qtd
              }
              await axios.put(`/product/${item.product_id}`, dataUP);
              await axios.put(`/shopping/product/`, dataSP);
              await axios.delete(`/cart/${item._id}`);
              someProduct = true;
            } else {
              toast.error(`Temos apenas ${linkProducts[item.product_id].stock} desse produto em estoque!`);
            }
            modifyLoad({ type: "LOADING_END" }); 
          } catch (err) {
            modifyLoad({ type: "LOADING_END" }); 
            toast.error(err.message);
          }
        }

        if (someProduct == false) {
          await axios.delete(`/shopping/${shopping_id}`)
        } else {
          toast.success("Produtos comprados!")
          window.location.reload();
        }
        
      } catch (err) {
        console.log(err.message);
      }
    } else {
      toast.success("Adicione alguns produtos primeiro");
    }
  }

  useEffect(() => {
    getUserCartProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [products]);

  useEffect(() => {
    // Calcula o total da compra sempre que houver alteração nos produtos ou em suas quantidades
    let totalPrice = 0;
    for (const item of products) {
      const product = linkProducts[item.product_id];
      if (product) { 
        totalPrice += product.value * item.qtd;
      }
    }
    setTotal(totalPrice);
  }, [products, linkProducts]);
  

  return (
        <section className="cart">
            { loading ? <Loading /> : <></>}
            <Header />
            <div className="totalPrice">
              <p className='total'>Valor total : <span>R${total.toFixed(2)}</span></p>
              <button onClick={handleBuy}>Fechar Pedido</button>
            </div>
            { products.length  == 0 ? <div className="emptyCart">
              <p>Empty Cart  <span>:(</span></p>
            </div> : "" }
            {user ? (
                <div className="shoppings">
                    {Object.keys(linkProducts).map((key) => {
                        const element = linkProducts[key];
                        const product = products.find((item) => item.product_id === element._id);
                        return (
                            <div className="cartProduct" key={key}>
                                <div className="img">
                                    <a href={`/product/${product.product_id}`}>
                                        <img src={element.img_preview} alt="product img" />
                                    </a>
                                </div>
                                <div className="info">
                                    <a href={`/product/${product.product_id}`}>
                                        <h4>{element.name}</h4>
                                        <p>R${(element.value * (1 - element.discount / 100)).toFixed(2)}</p>
                                    </a>
                                </div>
                                <div className="increment">
                                    <button onClick={() => updateProductCart(product._id, product.qtd - 1)}><BiSolidMinusCircle /></button>
                                    {product && <p>Quantidade: <span>{product.qtd}</span></p>}
                                    <button onClick={() => updateProductCart(product._id, product.qtd + 1)}><BsFillPlusCircleFill/></button>
                                    <button onClick={() => updateProductCart(product._id, 0)}><AiFillDelete /></button>
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