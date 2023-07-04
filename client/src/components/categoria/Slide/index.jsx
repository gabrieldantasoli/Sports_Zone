import React, { useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import CategoriaIcon from '../Icon';

//IMPORTANDO O CSS
import './categoriaSlide.css';


export default () => {
    const [categorias, setCategorias] = useState([{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "casa"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "fit"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "eletronicos"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "leitura"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "namorados"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "casa"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "fit"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "eletronicos"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "leitura"},{img: "https://firebasestorage.googleapis.com/v0/b/megamart-1fe70.appspot.com/o/images%2F00000004?alt=media&token=7967ebd1-cccb-432f-8feb-1c46a315f92c", name: "namorados"}]);

    return (
        <section className='categorias'>
            <h2>Navegue por categorias :</h2>
            <div className="categoriaSlide">
                {categorias.map((categoria, index) => (
                <CategoriaIcon key={index} img={categoria.img} name={categoria.name} />
            ))}
            </div>
            
        </section>
    )
}