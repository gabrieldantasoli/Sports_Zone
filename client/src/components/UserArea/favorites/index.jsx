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
                setFavorites(res.data)
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
        </div>
    )
}
