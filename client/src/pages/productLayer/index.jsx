import React, { useContext, useEffect, useState } from 'react';
import { Header } from "../../components/";

//IMPORTANDO O CSS
import './productLayer.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiSearchAlt, BiSolidStarHalf } from 'react-icons/bi';
import { RxTriangleDown } from 'react-icons/rx';
import { AuthContext } from '../../context/authContext';


export default () => {

    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const [produto, setProduto] = useState({});
    const [quantidade, setQuantidade] = useState(1);
    const [activeImage, setActiveImage] = useState('');

    const [pergunta, setPergunta] = useState("");
    const [resposta, setResposta] = useState("");
    const [perguntas, setPerguntas] = useState([]);
    const [respostas, setRespostas] = useState({});

    const [avaliacoes, setAvaliacoes] = useState([])
    const [media, setMedia] = useState(0);


    const handleClick = async () => {
        try {
            const res = await axios.get(`/product/${id}`);
            const questions = await axios.get(`/question/${id}`);
            const avaliacoes = await axios.get(`/assessment/${id}`)
            const produto = res.data;
            const questionsRes = questions.data;
            const avaliacoesRes = avaliacoes.data;

            let somaAssessment = 0;
            for (let i = 0; i < avaliacoesRes.length; i++) {
                somaAssessment += avaliacoesRes[i].assessment;
            }
            const mediaAssessment = somaAssessment / avaliacoesRes.length;

            setMedia(mediaAssessment);
            setPerguntas(questionsRes)
            setProduto(produto);
            setAvaliacoes(avaliacoesRes);
        } catch (err) {
            toast.error("Falha ao acessar banco de dados!");
        }
    }

    const handleSearch = async (text) => {
        try {
            if (text.trim() == "") {
                handleClick();
            } else {
                const questions = await axios.get(`/question/regex/${text.trim()}/${id}`);
                const questionsRes = questions.data;
                setPerguntas(questionsRes)
            }
        } catch (err) {
            toast.error("Falha ao acessar banco de dados!");
        }
    }

    const handleAnswer = async () => {
        try {
            const answers = {};
            for (let item in perguntas) {
                const answer =  await (await axios.get(`/answer/${perguntas[item]._id}`)).data;
                answers[perguntas[item]._id] = answer;
            }
            setRespostas(answers);
        } catch (err) {
            toast.error(err.message);
        }
    }

    const createQuestion = async () => {
        const question = {
            "product_id": id,
            "message": pergunta,
            "nick": user.username
        }
        try {
            await axios.put("/question", question);
            setPergunta("");
            toast.success("Pergunta cadastrada!");
            handleClick();
        } catch (err) {
            toast.error(err.message)
        }
    }

    const responder = async (p_id) => {
        const answer = {
            "question_id": p_id,
            "message": resposta,
            "nick": user.username
        }   
        try {
            await axios.put("/answer", answer);
            setResposta("");
            setRespostas({});
            handleAnswer();
        } catch (err) {
            toast.error(err.message);
        }
    }

    const setActive = (e) => {
        const key = e.target.getAttribute('data-key');
        setActiveImage(produto.img_gallery[key]);
    }

    const incrementViews = async () => {
        try {
            const userViews = await axios.get(`/views/get/${user._id}`);
            const data = {
                [produto.category]: userViews.data[0][produto.category] + 1,
              };
            await axios.put(`/views/${user._id}`,data);
        } catch (err) {
            console.log(err);
        }
    }
        
    useEffect(() => {
        handleClick();
    }, []);
        
    useEffect(() => {
        handleAnswer();
    }, [perguntas]);

    useEffect(() => {
        incrementViews();
    }, [produto]);

    useEffect(() => {
        const items = document.getElementsByClassName("itemImg");
        if (items.length > 0) {
            items[0].classList.add("active");
            Array.from(items).forEach(element => {
                element.addEventListener("mouseenter", setActive);
            });
        }
        return () => {
            Array.from(items).forEach(element => {
                element.removeEventListener("mouseenter", setActive);
            });
        };
    }, [produto]);

    return (
        <section className='product_layer'>
            <Header />

            <div className="productInfo">
                <div className="imgs">
                    <div className="imgSlide">
                        {produto.img_gallery && produto.img_gallery.map((item, index) => (
                            <div className={`itemImg ${item === activeImage ? 'active' : ''}`} key={index} data-key={index}>
                                <img src={item} alt="img slider" />
                            </div>
                        ))}
                    </div>
                    <div className="imgPreview">
                        <img className='preview' src={activeImage || produto.img_preview} alt="img" />
                    </div>
                    
                </div>
                <div className="info">
                    <div className="name">
                        <h2>{produto.name}</h2>
                        <p className='brand'>Marca: {produto.brand}</p>
                        <div className="stars">
                            <div className='avaliacoesStars'>
                                {Array.from({ length: parseInt(media) }, (_, index) => (
                                    <AiFillStar />
                                ))}
                                {media - parseInt(media) > 0 ? <BiSolidStarHalf /> : ""}
                                {Array.from({ length: (5 - parseInt(media)) }, (_, index) => (
                                    <AiOutlineStar />
                                ))}
                            </div>
                            <p>{avaliacoes.length} Avaliações de clientes</p>
                        </div>
                        <hr />
                    </div>
                    <div className="valor">
                        <p>Valor: R${(produto.value * (1 - produto.discount/100)).toFixed(2)}</p>
                        <p>Categoria: {produto.category}</p>
                    </div>
                    <hr />
                    <div className="about">
                        <p>Sobre este item</p>
                        <ul>
                            {produto.details &&
                            produto.details.split(",").map((item, index) => (
                                <li key={index}>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="buy">
                    <p className='value'><span>Valor: R$</span>{(produto.value * (1 - produto.discount/100)).toFixed(2)}</p>
                    <p className='entrega'><span>Entrega: </span>{produto.delivery === 0 ? "Grátis" : `R$${produto.delivery}`}  </p>
                    <p><GrLocation /> Enviar para 58380000</p>
                    <p className="estoque">Em estoque: {produto.stock}</p>
                    <div className="quantidade">
                        <label htmlFor="quantidade">Quantidade : </label>
                        <input type="number" name="quantidade" id="quantidade" value={quantidade} min={1} max={produto.stock} onChange={(e) => setQuantidade(e.target.value > produto.stock ? produto.stock : e.target.value)} />
                    </div>
                    
                    <button id='add'>Adicionar ao carrinho</button>
                    <button id='buy'>Comprar agora</button>
                    <hr />
                    <button id='fav'>Favoritar</button>
                </div>
            </div>
            <div className="perguntas">
                <div className="search">
                    <label htmlFor="pergunta">Procurando informações específicas?</label>
                    <div className="search_content">
                        <button className='search' onClick={() => handleSearch(pergunta)}><BiSearchAlt /></button>
                        <input type="text" name="pergunta" id="pergunta" placeholder='Busque ou faça oerguntas' value={pergunta} onChange={(e) => setPergunta(e.target.value)} />
                        { pergunta.trim() != "" ? <button onClick={createQuestion} className='pergunta'>Criar pergunta</button> : ""} 
                    </div>
                </div>
                
                <div className="area">
                    { perguntas.length == 0 ? "Nenhuma pergunta feita até o momento" :  (
                        <div>
                            {perguntas.map((item, index) => (
                                <div className="perguntaItem">
                                    <div className="content">
                                        <p><span>Pergunta: </span>{item.message}</p>
                                        <p><span>By: </span> {item.nick} </p>
                                    </div>
                                    <details className="answers">
                                        <summary><span>Repostas:</span> <RxTriangleDown /></summary>
                                            <div className="answerInput">
                                                <input type="text" placeholder='Responda a questão' name="resposta" id="resposta" value={resposta} onChange={(e) => setResposta(e.target.value)} />
                                                <button onClick={() => responder(item._id)}>Responder</button>
                                            </div>
                                            {respostas[item._id] && respostas[item._id].map((obj, index) => (
                                                <div className='resposta'>
                                                    <p key={index}><span>Resposta:</span> {obj.message}</p>
                                                    <p key={index+" "}><span>By:</span> {obj.nick}</p>
                                                </div>
                                            ))}
                                    </details>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="avaliacoes">
                <hr />
                <h3>avaliações</h3>
                <div className="avalicoes">
                    { avaliacoes.length == 0 ? <p className='nenhum'>Nenhuma avaliação ainda. Seja o primeiro !!!</p> : ""}
                    {avaliacoes && avaliacoes.map((obj, index) => (
                        <div className="avaliacaoItem">
                            <p key={index}><span>Resposta:</span> {obj.message}</p>
                            <p key={index+" "}><span>By:</span> {obj.nick}</p>
                            <div className="avaliacoesStars">
                                {Array.from({ length: parseInt(obj.assessment) }, (_, index) => (
                                    <AiFillStar />
                                ))}
                                {obj.assessment - parseInt(obj.assessment) > 0 ? <BiSolidStarHalf /> : ""}
                                {Array.from({ length: (5 - parseInt(obj.assessment)) }, (_, index) => (
                                    <AiOutlineStar />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
