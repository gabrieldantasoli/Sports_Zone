import React, { useContext, useEffect, useState } from 'react';

//IMPORTANDO O CSS
import '../userArea.css';
import './data.css';
import { AuthContext } from "../../../context/authContext.js";
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";
import { toast } from 'react-toastify';
import axios from "axios";

export default () => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const handleUpdate = async () => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let data = {};
        if (password == "") {
            data = {
                "username": username,
                "email": email
            }
        } else {
            data = {
                "username": username,
                "email": email,
                "password": hash
            }
        }
        try {
            await axios.put(`/user/${user.user._id}`, data);
            toast.success("Dados de Usuário Atualizado!")
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        setUsername(user.user.username);
        setEmail(user.user.email);
    },[user]);

    return (
        <div>
            { user != null ? (
                <section className="container">
                    <h4>Upload User Data</h4>
                    <label htmlFor="username">Username :</label>
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUploaded(true);
                        }}
                        className="lInput"
                    />
                    <label htmlFor="username">Email :</label>
                    <input
                        type="text"
                        placeholder="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setUploaded(true);
                        }}
                        className="lInput"
                    />
                    <label htmlFor="password">Senha :</label>
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
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