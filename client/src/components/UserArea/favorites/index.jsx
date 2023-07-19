import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import '../userArea.css';
import { AuthContext } from '../../../context/authContext';
import { toast } from 'react-toastify';
import axios from 'axios';

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

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <div className='area'>
            <h3>favorites</h3>

            <div className="favorites">
                { favorites.map((item, index) => {
                    return (
                        <div className="favoriteItem">
                            <p>{ item.name }</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
