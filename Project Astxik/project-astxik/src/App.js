import logo from './logo.svg';
import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfileMenu from './components/ProfileMenu';
import ProductDetails from './components/ProductDetails';
import { supabase } from './supabase-client';
import { useQuery } from '@tanstack/react-query';

import './App.css';

function App() {
   const fetchProducts = async() => {
      const {data, error} = await supabase
      .from('Products')
      .select('*');

        return data;
      };

  const productQuery = useQuery({queryKey: ["Products"], queryFn: fetchProducts})
  const productData = productQuery.data;

  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<ProductDetails productData={productData} />}></Route>
            <Route path="/product/:id" element={<ProductDetails productData={productData}/>}></Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
