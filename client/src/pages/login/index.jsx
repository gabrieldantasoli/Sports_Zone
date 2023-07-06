import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Logo_img } from "../../imgs";

const Login = () => {
const [credentials, setCredentials] = useState({
username: undefined,
password: undefined,
});


const navigate = useNavigate()

const handleChange = (e) => {
setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};

const handleClick = () => {

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
    {/* {error && <span>{error.message}</span>} */}
    </div>
    <div className="link_register">
        <span>Novo na Sport Zone ?</span>
        <a href="/register">Criar minha conta</a>
    </div>
</div>
);
};

export default Login;