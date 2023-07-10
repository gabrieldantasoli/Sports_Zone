import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Logo_img } from "../../imgs";
import { AuthContext } from "../../context/authContext";
import { toast } from 'react-toastify';



const Login = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:8800/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
            toast.success("You are logged in!")
        } catch (err) {
            toast.error(err.response.data);
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
            id="username"
            onChange={handleChange}
            className="lInput"
        />
        <label htmlFor="password">Senha :</label>
        <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
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