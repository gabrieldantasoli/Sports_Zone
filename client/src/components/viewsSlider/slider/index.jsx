import React, { useContext, useEffect, useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Icon from '../item';

// IMPORTANDO O CSS
import './slide.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/authContext';

export default () => {
  const { user } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);

  const handleClick = async () => {
    try {
      const res = await axios.get('/product');
      if (user != null) {
          const userViews = (
            await axios.get(`/views/get/${user._id}`)
          ).data[0];

          console.log(userViews);

          const sortedProducts = res.data.sort((a, b) => calculateProductScore(b, userViews) - calculateProductScore(a, userViews));
          const limitedProducts = sortedProducts.slice(0, 15);
          setProdutos(limitedProducts);
      }
    } catch (err) {
      toast.error('Falha ao acessar banco de dados!');
    }
  };

  const calculateProductScore = (product, userViews) => {
    const category = product.category;
    const views = userViews[category] || 0;
    const sold = product.sold || 0;
    const discount = product.discount || 0;
    const delivery = product.delivery || 0;
    const prevision = product.prevision || 0;
    const value = product.value || 0;

    return views * 100 + sold * 2 + discount * 3 - delivery - prevision - value * 0.2;
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div>
      {user ? (
        <section className="categorias">
          <h2>Com base nas suas visualizações:</h2>
          <div className="categoriaSlide">
            {produtos.map((produto, index) => (
              <Icon key={index} produto={produto} />
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};
