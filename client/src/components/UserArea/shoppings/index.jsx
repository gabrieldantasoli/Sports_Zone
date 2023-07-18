import React, { useContext, useEffect, useState } from 'react';

//IMPORTANDO O CSS
import '../userArea.css';
import { toast } from 'react-toastify';
import { AuthContext } from "../../../context/authContext.js";
import axios from "axios";
import { GiNotebook } from "react-icons/gi";

export default () => {

    const { user } = useContext(AuthContext);   

    const [dataShoppings, setDataShoppings] = useState({});
    const [avaliation, setAvaliation] = useState(false);

    const getShoppings = async () => {
        if (user != null) {
            try {
                const res = await axios.get(`/shopping/get/${user._id}`);
                let data = {};
                for (let item in res.data) {
                    const array = [];
                    const shoppingItem = await axios.get(`/shopping/${res.data[item]._id}`);
                    array.push(shoppingItem.data);

                    let array2 =[];
                    for (let sItem in shoppingItem.data) {
                        const product = await axios.get(`/product/${shoppingItem.data[sItem].product_id}`);
                        array2.push(product.data);
                    }

                    array.push(array2);
                    data[res.data[item]._id] = array;
                }
                console.log(data);
                setDataShoppings(data);
            } catch (err) {
                toast.error("Falha ao acessa o banco de dados!");
            }
        }
        
    }

    function isInteger(str) {
        const num = parseFloat(str);
        return Number.isInteger(num) && num >= 1 && num <= 5;
    }

    const avaliarProduto = async (id) => {
        const message = prompt("Digite a mensagem de avaliação :");
        if (message) {
            const nota = prompt("Digite Uma nota de 1 a 5 (casa decimal separada por .) :");
            if (isInteger(nota)) {
                try {
                    const data = {
                        "product_id": id,
                        "message": message,
                        "assessment": nota,
                        "nick": user.username
                    }
                    await axios.put(`/assessment/`, data);
                    toast.success("Avaliação criada");
                } catch (err) {
                    toast.error(err.message);
                }
            }
            
        }
    }

    const calculateTotal = (shoppingItems) => {
        let total = 0;
        for (const item of shoppingItems) {
          total += item.unityValue * item.qtd;
        }
        return total;
      };

    useEffect(() => {
        getShoppings();
    },[]);

    return (
        <div className='area'>
            <h3>Your Shoppings</h3>
            { dataShoppings.length == 0 ? <p>Nenhuma Compra foi feita ainda!</p> : ""}
            {Object.keys(dataShoppings).map((key, index) => {
                        const item = dataShoppings[key];
                        const totalPurchaseAmount = calculateTotal(item[0]);
                        return (
                            <div key={index} className='shopping_item'>
                                <p>Total da compra : R${totalPurchaseAmount} </p>
                                { item[0].map((item2, index) => {
                                    const product = item[1].find((i) => i._id === item2.product_id);
                                    const shopping = item2;
                                    return (
                                        <div className='item'>
                                            <div className='img'>
                                                <a href={`/product/${product._id}`}><img src={product.img_preview} alt="product image" /></a>
                                            </div>
                                            <div className="info">
                                                <a href={`/product/${product._id}`}><p>{ product.name }</p></a>
                                                
                                                <div>
                                                    <p>R${ (product.value).toFixed(2) } </p>
                                                    <p>Qtd: { shopping.qtd }</p>
                                                    <p>Total: R${ (shopping.unityValue * shopping.qtd).toFixed(2) }</p>
                                                </div>
                                            </div>
                                            <div className='avaliation'>
                                                <button onClick={() => avaliarProduto(product._id)}><GiNotebook /></button>
                                            </div>
                                        </div> 
                                    )
                                    
                                })}
                            </div>
                        );
                    })}
        </div>
    )
}