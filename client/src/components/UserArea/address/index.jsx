import React, { useContext, useEffect, useState } from 'react';

//IMPORTANDO O CSS
import '../userArea.css';
import '../data/data.css';
import { AuthContext } from "../../../context/authContext.js";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

export default () => {

    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [street, setStreet] = useState("");
    const [complement, setComplement] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState({});

    const [uploaded, setUploaded] = useState(false);

    const handleUpdate = async () => {
        let data = {
            "country": country,
            "state": state,
            "city": city,
            "neighborhood": neighborhood,
            "street": street,
            "complement": complement,
            "number": number
        };
        if (address.length == 0) {
            try {
                await axios.put(`/address`, data);
                toast.success("Address created!")
            } catch (err) {
                toast.error(err.message);
            }
        } else {

        }
        // if (password == "") {
        //     data = {
        //         "username": username,
        //         "email": email
        //     }
        // } else {
        //     data = {
        //         "username": username,
        //         "email": email,
        //         "password": hash
        //     }
        // }
        // try {
        //     await axios.put(`/user/${user.user._id}`, data);
        //     toast.success("Dados de Usuário Atualizado!")
        // } catch (err) {
        //     toast.error(err.message);
        // }
    }

    useEffect(() => {
        const getAddress = async () => {
            const res = await axios.get(`/address/${user.user._id}`);
            console.log(res.data);
            setAddress(res.data);
        };

        getAddress();
    },[user]);

    return (
        <div>
            { user != null ? (
                <section className="container">
                    <h4>Upload User Address</h4>
                    <label htmlFor="country">Country :</label>
                    <input
                        type="text"
                        placeholder="Country"
                        id="country"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="state">State :</label>
                    <input
                        type="text"
                        placeholder="State"
                        id="state"
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="city">City :</label>
                    <input
                        type="text"
                        placeholder="City"
                        id="city"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="neighborhood">Neighborhood :</label>
                    <input
                        type="text"
                        placeholder="Neighborhood"
                        id="neighborhood"
                        value={neighborhood}
                        onChange={(e) => {
                            setNeighborhood(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="street">Street :</label>
                    <input
                        type="text"
                        placeholder="Street"
                        id="street"
                        value={street}
                        onChange={(e) => {
                            setStreet(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="complement">Complement :</label>
                    <input
                        type="text"
                        placeholder="Complement"
                        id="complement"
                        value={complement}
                        onChange={(e) => {
                            setComplement(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />

                    <label htmlFor="number">Number :</label>
                    <input
                        type="text"
                        placeholder="Number"
                        id="number"
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />
                    
                    <button disabled={uploaded == false} className={uploaded == true ? "active" : ""} onClick={handleUpdate}>
                        Update
                    </button>
                </section>
            ) : navigate("/login")}
        </div>
    );
}