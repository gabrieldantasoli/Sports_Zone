import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import '../userArea.css';
import './favorites.css';
import { AuthContext } from '../../../context/authContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

export default () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // Use useNavigate hook

    const [favorites, setFavorites] = useState([])

    const getFavorites = async () => {
        if (user != null) {
            try {
                const res = await axios.get(`/favorites/${user._id}`);
                const data = res.data;

                let favoriteProducts = [];
                for (let item in data) {
                    const res = await axios.get(`/product/${data[item].product_id}`);
                    favoriteProducts.push(res.data);
                }

                setFavorites(favoriteProducts);
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            navigate("/login");
        }
    }

    const removeFavorite = async (id) => {
        try {
            await axios.delete(`/favorites/${user._id}/${id}`);
            toast.success("Produto desfavoritado!");
            getFavorites();
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <div className='area'>
            <h3>favorites</h3>

            <div className="favorites">
                {favorites.length == 0 ? <p className='load'>Adicione alguns favoritos!</p> : <></>}
                { favorites.map((item, index) => {
                    return (
                        <div className="favoriteItem">
                            <div className="image">
                                <img src={item.img_preview} alt="favorite product image" />
                            </div>
                            <div className="favoriteinfo">
                                <div>
                                    <p className='name'>{ item.name }</p>
                                </div>
                                <div>
                                    <p>Categoria: { item.category }</p>
                                    <p>Marca: { item.brand }</p>
                                </div>
                            </div>
                            <button onClick={() => removeFavorite(item._id)}><AiFillDelete /></button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
