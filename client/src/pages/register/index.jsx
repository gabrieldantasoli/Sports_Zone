import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../login/login.css";
import { Logo_img } from "../../imgs";
import { AuthContext } from "../../context/authContext";
import { toast } from 'react-toastify';

const Login = () => {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const info = {
              "username": `${username}`,
              "email": `${email}`,
              "password": `${password}`,
              "isAdmin": false,
              "pass": false
            }
            await axios.post("/auth/register", info);
            navigate("/login")
            toast.success("Registered user!")
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    return (
    <div className="login">
        <div className="lContainer">
            <img src={Logo_img} alt="logo img" />
            <label htmlFor="username">Username :</label>
            <input
                type="text"
                placeholder="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="lInput"
            />
            <label htmlFor="email">Email :</label>
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
            <button disabled={false} onClick={handleClick} className="lButton">
                Login
            </button>
            <p>Ao continuar, você concorda com as Condições de Uso da Sport Zone. Por favor verifique a Notificação de Privacidade, Notificação de Cookies e a Notificação de Anúncios Baseados em Interesse. </p>
            {error && loading && toast.error("Error")}
        </div>
        <div className="link_register">
            <span>Já tem conta ?</span>
            <a href="/login">Login</a>
        </div>
    </div>
    );
};

export default Login;