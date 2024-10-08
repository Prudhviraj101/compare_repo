import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './signup';
import Navbar from './navbar';
import Homepage from './homepage';
import Login from './login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './project.css';
import Categories from './categories';
import Products from './products';
import Compare from './compare';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='categories' element={<Categories/>}/>
    <Route path='products/:id' element={<Products/>}/>
    <Route path='products/:id/compare' element={<Compare/>}/>
  </Routes>
  </BrowserRouter>
);
reportWebVitals();
