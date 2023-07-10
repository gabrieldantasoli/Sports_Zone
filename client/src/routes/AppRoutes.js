import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, Register, Cart } from '../pages';

export default () => {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
        </Routes>
    );
};