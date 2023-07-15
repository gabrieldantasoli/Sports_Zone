import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { LoadingContextProvider } from './context/backendLoading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <LoadingContextProvider>
        <App />
      </LoadingContextProvider>
    </AuthContextProvider>  
  </BrowserRouter>
);




/**
 *                       FRONT_END
 *                   ____     ______________            *                 
 *     *            /___/|   /_____________/|                             
 *                  |   ||   |    _________|/    *                     
 *       *          |   ||   |    | |______                            
 *   *              |   ||   |    |/______/|                                          
 *       *   ___    |   ||   |________    ||         *            
 *          /  /|___|   ||    ________|   ||
 *    *    |  |_/___|   ||   /________|   ||
 *          \__________//    |____________|/    *
 * 
 * 
 *  + Developed by : GabrielDantasOli
 *  + GITHUB       : https://github.com/gabrieldantasoli
 *  + Contact      : gabriel.dantas.oliveira@ccc.ufcg.edu.br
 *  + JAVASCRIPT FOR ALL LIFE!
 * 
 **/ 