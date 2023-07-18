import React, { useContext, useEffect, useState } from 'react';

//IMPORTANDO O CSS
import '../userArea.css';
import { AuthContext } from "../../../context/authContext.js";
import { useNavigate } from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uploaded, setUploaded] = useState(false);

    useEffect(() => {
        setUsername(user.user.username);
        setEmail(user.user.email);
    },[user]);

    return (
        <div>
            { user != null ? (<p>ok</p>) : navigate("/login")}
            <div className="Container">
                <label htmlFor="username">Username :</label>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="lInput"
                />
                <label htmlFor="username">Email :</label>
                <input
                    type="text"
                    placeholder="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="lInput"
                />
                <label htmlFor="password">Senha :</label>
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="lInput"
                />
                <button disabled={false} className="lButton">
                    Login
                </button>
            </div>
        </div>
    );
}