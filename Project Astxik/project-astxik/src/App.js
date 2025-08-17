import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from 'react';
import ProductDetails from './components/ProductDetails';
import { supabase } from './supabase-client';
import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';

import './App.css';
import Cart from './components/Cart';

export const CartContext = createContext([]);

function App() {

    const {user} = useAuth;
    const [cart, setCart] = useState([]);

     const fetchCarts = async() => {
         const { data, error } = await supabase
         .from("Cart")
         .select("carts")
         .eq("users", user.uid)
         .single();
   
         if(error){
           return [];
         }
   
         let result = data?.carts;
   
         return result ?? [];
     }
   
     const cartsQuery = useQuery({queryKey: ["carts"], queryFn: fetchCarts})

  return (
    <AuthProvider>
      <CartContext.Provider value={{cart, setCart}}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<ProductDetails cartData={cartsQuery.data}/>}></Route>
            <Route path="/product/:id" element={<ProductDetails cartData={cartsQuery.data}/>}></Route>
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </AuthProvider>
  );
}

export default App;
