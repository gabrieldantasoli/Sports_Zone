import React, { useEffect, useState } from 'react';
import { Header } from '../../components';

//IMPORTANDO O CSS
import './productCategory.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryItem from '../../components/categoryItem';

export default () => {

    const { name } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();

    const handleLoad = async () => {
        try {
            const res = await axios.get(`/product/category/${name}`);
            const categoryInfo = await axios.get(`/category/${name}`);
            const productsData = res.data;
            const categoryData = categoryInfo.data;
            setCategory(categoryData[0]);
            setProducts(productsData);
        } catch (err) {
            toast.error("Falha ao acessar banco de dados!");
        }
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <section className='productCatedory'>
            <Header />
            <div className="products">
                {category && (
                    <div className="categoryLogo">
                        <img src={category.img} alt="" />
                        <h2>{category.name}</h2>
                    </div>
                )}
                
                <div className="categoryProductsSection">
                    {products.map((item, index) => (
                        <a href={`/product/${item._id}`} key={index}>
                            <CategoryItem name={item.name} img={item.img_preview} off={item.discount}/>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}