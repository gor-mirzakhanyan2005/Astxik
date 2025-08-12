import React from 'react';
import Nav from './Nav';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Main from "./Main";
import ProfileMenu from './ProfileMenu';
import AddProduct from './AddProduct';
import Cart from './Cart';
import { createContext } from 'react';
import About from './About';
import Footer from './Footer';
import { supabase } from '../supabase-client';
import ProductDetails from './ProductDetails';

export const CartContext = createContext([]);

function Home() {
  const navigate = useNavigate();
  const {user, loading} = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("pick a category...");
  const [filterCategory, setFilterCategory] = useState("All");
  const [about, setAbout] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if(!user && !loading){
      navigate("/")
    }
  }, [user, loading, navigate])

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

  useEffect(()=> {
    if(cartsQuery.data){
      let result = cartsQuery.data;

      setCart(result);
    }
  }, [cartsQuery.data])

  const updateCart = async() => {
    const {data} = await supabase
    .from('Cart')
    .upsert({users: user.uid, carts: cart})
  }

  useEffect(() => {
    if(cart.length > 0){
      updateCart();
      console.log(cart);
    }
  }, [cart])

  const categories = [
    { label: 'Pick category', value: 'placeholder'},
    { label: 'Computer', value: 'computer'},
    { label: 'Car', value: 'car'},
    { label: 'CD/DVD/Blu-Ray player', value: 'discplayer'},
    { label: 'Smartphone', value: 'smartphone' },
    { label: 'Tablet', value: 'tablet' },
    { label: 'Television', value: 'television' },
    { label: 'Camera', value: 'camera' },
    { label: 'Refrigerator', value: 'refrigerator' },
    { label: 'Washing Machine', value: 'washin gmachine' },
    { label: 'Microwave', value: 'microwave' },
    { label: 'Headphones', value: 'headphones' },
    { label: 'Speakers', value: 'speakers' },
    { label: 'Watch', value: 'watch' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Bicycle', value: 'bicycle' },
    { label: 'Motorcycle', value: 'motorcycle' },
    { label: 'Game Console', value: 'gameconsole' },
    { label: 'Printer', value: 'printer' },
    { label: 'Monitor', value: 'monitor' },
    { label: 'Drone', value: 'drone' },
    { label: 'Cellphone', value: 'cellphone' },
    { label: 'Laptop', value: 'laptop' },
    { label: 'Music Player', value: 'music player' }
  ];

  const filterCategories = [
    { label: 'All', value: 'all'},
    { label: 'Computer', value: 'computer'},
    { label: 'Car', value: 'car'},
    { label: 'CD/DVD/Blu-Ray player', value: 'disc player'},
    { label: 'Smartphone', value: 'smartphone' },
    { label: 'Tablet', value: 'tablet' },
    { label: 'Television', value: 'television' },
    { label: 'Camera', value: 'camera' },
    { label: 'Refrigerator', value: 'refrigerator' },
    { label: 'Washing Machine', value: 'washingmachine' },
    { label: 'Microwave', value: 'microwave' },
    { label: 'Headphones', value: 'headphones' },
    { label: 'Speakers', value: 'speakers' },
    { label: 'Watch', value: 'watch' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Bicycle', value: 'bicycle' },
    { label: 'Motorcycle', value: 'motorcycle' },
    { label: 'Game Console', value: 'game console' },
    { label: 'Printer', value: 'printer' },
    { label: 'Monitor', value: 'monitor' },
    { label: 'Drone', value: 'drone' },
    { label: 'Cellphone', value: 'cellphone' },
    { label: 'Laptop', value: 'laptop' },
    { label: 'Music Player', value: 'musicplayer' }
  ];

  return (
    <div>
      <CartContext.Provider value={{cart, setCart}}>
        {productDetails && <ProductDetails cart={cart} setCart={setCart}
          productDetails={productDetails} setProductDetails={setProductDetails}/>}
        {cartOpen && <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} setCart={setCart}/>}
        {profileOpen && <ProfileMenu profileOpen={profileOpen} setProfileOpen={setProfileOpen} />}
        {addOpen && <AddProduct
          category={category}
          setCategory={setCategory}
          categories={categories}
          addOpen={addOpen}
          setAddOpen={setAddOpen} />}
        {user ?
          <>
            {!cartOpen && !profileOpen && !addOpen &&
              <Nav profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
                about={about}
                setAbout={setAbout}
              />
            }

            {about && <About />}

            {!cartOpen && !profileOpen && !addOpen && !about && !productDetails &&
            <>
              <Main
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterCategories={filterCategories}
                addOpen={addOpen}
                setAddOpen={setAddOpen}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                setCart={setCart}
                productDetails={productDetails}
                setProductDetails={setProductDetails}/>
            </>}
            <>
              <Footer
                about={about}
                setAbout={setAbout}
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}/>
            </>

            </>
            :
            <>
              <div>Loading...</div>
            </>
          }
        </CartContext.Provider>
      </div>
  )
}

export default Home