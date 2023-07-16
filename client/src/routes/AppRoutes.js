import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, ProductLayer, Login, Register, Cart, ProductCategory, UserPage } from '../pages';
import { AuthContext } from '../context/authContext';


export default () => {

    const { user } = useContext(AuthContext);
    
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            { user != null ? <Route path='/userpage' element={<UserPage />} /> : <Route path='/userpage' element={<Login />} /> }
            <Route path='/product/:id' element={<ProductLayer />} />
            <Route path='/category/:name' element={<ProductCategory />} />
        </Routes>
    );
};