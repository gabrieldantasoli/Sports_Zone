import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Logo_img } from "../../imgs";
import { AuthContext } from "../../context/authContext";
import { toast } from 'react-toastify';

const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const info = {
                "username": `${username}`,
                "password": `${password}`
            }
            const res = await axios.post("/auth/login", info);
            const userViews = await axios.get(`/views/get/${res.data.details._id}`);
            if (userViews.data.length == 0) {
                // .log(res.data.details._id);
                const data = {
                    "user": `${res.data.details._id}`,
                    "alimentos": 0,
                    "equipamentos": 0,
                    "vestuario": 0,
                    "bebidas": 0,
                    "suplementos": 0,
                    "eletronicos": 0,
                    "tenis": 0,
                    "acessorios": 0,
                    "ferramentas": 0
                }
                await axios.put("/views", data);
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
            toast.success("You are logged in!")
        } catch (err) {
            toast.error("Usuário não encontrado(a) !");
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    }

    return (
    <div className="login">
        <div className="lContainer">
            <img src={Logo_img} alt="logo img" />
            <label htmlFor="username">Email :</label>
            <input
                type="text"
                placeholder="username"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <span>Novo na Sport Zone ?</span>
            <a href="/register">Criar minha conta</a>
        </div>
    </div>
    );
};

export default Login;