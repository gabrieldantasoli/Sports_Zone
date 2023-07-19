import React, { useContext, useEffect, useState } from 'react';

//IMPORTANDO O CSS
import './product.css';
import { AuthContext } from "../../../context/authContext.js";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

export default () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [product_id, setProduct_id] = useState("");
    const [product_id_aux, setProduct_id_aux] = useState("");

    const [product, setProduct] =  useState("");

    const [name , setname] = useState("");
    const [category , setcategory] = useState("");
    const [value , setvalue] = useState(0);
    const [discount , setdiscount] = useState(0);
    const [prevision , setprevision] = useState(0);
    const [brand , setbrand] = useState("");
    const [delivery , setdelivery] = useState(0);
    const [stock , setstock] = useState("");
    const [details , setdetails] = useState("");
    const [img_preview , setimg_preview] = useState("");
    const [img_gallery , setimg_gallery] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const handleUpdate = async () => {
        const array = img_gallery.join(",");
        let data = {
            "name": name,
            "category": category,
            "value": value,
            "discount": discount,
            "prevision": prevision,
            "brand": brand,
            "name_model": "none",
            "description": "none",
            "delivery": delivery,
            "stock": stock,
            "details": details,
            "img_preview": img_preview,
            "img_gallery": array
        };

        if (user != null) {
            try {
                await axios.put(`/product/${product_id}`, data);
                toast.success("Produto cadastrado!");
                unloadProduct();
            } catch (err) {
                toast.error(err.message);
            }
        }
    }

    const loadProduct = async (id) => {
        try {
            const res = await axios.get(`/product/${id}`);
            const data = res.data;
            setProduct(res.data);
            setProduct_id(id);
            setname(data.name);
            setcategory(data.category);
            setvalue(data.value);
            setdiscount(data.discount);
            setprevision(data.prevision);
            setbrand(data.brand);
            setdelivery(data.delivery);
            setstock(data.stock);
            setdetails(data.details);
            setimg_preview(data.img_preview);
            setimg_gallery(data.img_gallery);
        } catch (err) {
            toast.error("Produto não encontrado!");
        }
    }

    const unloadProduct = async (id) => {
        try {
            setProduct("res.data");
            setProduct_id("");
            setProduct_id_aux("");
            setname("data.name");
            setcategory("");
            setvalue(0);
            setdiscount(0);
            setprevision(0);
            setbrand("");
            setdelivery(0);
            setstock(0);
            setdetails("");
            setimg_preview("");
            setimg_gallery("");
        } catch (err) {
            toast.error("Produto não encontrado!");
        }
    }
    useEffect(() => {
        
    },[]);

    return (
        <div>
            {user == null ? navigate("/login") : <></> }
            { user != null && product_id == "" ? (
                <section className="product">
                    <h4>Create Product</h4>
                    <label htmlFor="pid" className='pid'>Product Id :</label>
                    <input
                        type="text"
                        placeholder="Product Id"
                        id="pid"
                        value={product_id_aux}
                        onChange={(e) => {
                            setProduct_id_aux(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <button disabled={uploaded == false} className={uploaded == true ? "active" : ""} onClick={() => loadProduct(product_id_aux)}>
                        Buscar
                    </button>
                </section>
            ): <></>}
            { user != null && product_id != "" ? (
                <section className="product">
                    <h4>Create Product</h4>

                    <label htmlFor="name">Name :</label>
                    <input
                        type="text"
                        placeholder="Name"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="category">Category :</label>
                    <input
                        type="text"
                        placeholder="Category"
                        id="category"
                        value={category}
                        onChange={(e) => {
                            setcategory(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="value">Value :</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Value"
                        id="value"
                        value={value}
                        onChange={(e) => {
                            setvalue(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="discount">Distcount :</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="Discount"
                        id="discount"
                        value={discount}
                        onChange={(e) => {
                            setdiscount(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="prevision">Prevision :</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Prevision"
                        id="prevision"
                        value={prevision}
                        onChange={(e) => {
                            setprevision(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="brand">Brand :</label>
                    <input
                        type="text"
                        placeholder="Brand"
                        id="brand"
                        value={brand}
                        onChange={(e) => {
                            setbrand(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="delivery">Delivery :</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Delivery"
                        id="delivery"
                        value={delivery}
                        onChange={(e) => {
                            setdelivery(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="stock">Stock :</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Stock"
                        id="stock"
                        value={stock}
                        onChange={(e) => {
                            setstock(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="details">Details :</label>
                    <input
                        type="text"
                        placeholder="Details"
                        id="details"
                        value={details}
                        onChange={(e) => {
                            setdetails(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="img_preview">Img_Preview :</label>
                    <input
                        type="text"
                        placeholder="Img_Preview"
                        id="img_preview"
                        value={img_preview}
                        onChange={(e) => {
                            setimg_preview(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="img_gallery">Img_Gallery :</label>
                    <input
                        type="text"
                        placeholder="Img_Gallery"
                        id="img_gallery"
                        value={img_gallery}
                        onChange={(e) => {
                            setimg_gallery(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    
                    <button disabled={uploaded == false} className={uploaded == true ? "active" : ""} onClick={handleUpdate}>
                        Update
                    </button>
                </section>
            ) : <></>}
        </div>
    );
}