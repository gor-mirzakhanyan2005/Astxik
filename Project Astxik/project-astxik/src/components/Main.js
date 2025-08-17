import React, { useContext } from 'react';
import styles from "../stylesheets/Main.module.css";
import { useState, useEffect } from 'react';
import { supabase } from '../supabase-client';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { SlBasket } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import Pages from './Pages';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';


const Main = ({addOpen,
  setAddOpen,
  filterCategories,
  filterCategory,
  setFilterCategory,
  cartOpen,
  setCartOpen}) => {

  const {cart, setCart} = useContext(CartContext)
  const {user} = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(10);
  const [query, setQuery] = useState("");

  const fetchProducts = async() => {
      const {data, error} = await supabase
      .from('Products')
      .select('*');

        return data;
      };

  const productQuery = useQuery({queryKey: ["Products"], queryFn: fetchProducts})

   useEffect(() => {
    setFilterCategory("all");
    }, []);

    useEffect(() => {
      console.log(cart);
    }, [cart])

  if(productQuery.isLoading) return <div>Loading...</div>
  if(!productQuery.data) return <div>No products found</div>
  if (productQuery.error) return <div>Error: unable to fetch data</div>

  const lastIndex = currentPage * posts;
  const firstIndex = lastIndex - posts;
  const currentRange = productQuery.data.slice(firstIndex, lastIndex);

  const categorizeItems = (filterCategory, products) => {
    if(filterCategory === "all"){
      return products;
    }
    return products.filter(product => product.productCategory.toLowerCase().includes(filterCategory))
  }

  const queryItems = (query, products) => {
    if(!query){
      return products;
    }
    return products.filter(product => product.productName.toLowerCase().includes(query.toLowerCase()))
  }

  const categorizedItems = categorizeItems(filterCategory, currentRange)

  const displayItems = queryItems(query, categorizedItems);

  console.log(productQuery.data);
  console.log(user.uid);

  return (
    <div>
        <main className={styles.main}>
            <h1>Check out what's in store!</h1>

            <div className={styles.productList}>
              <ul>
                <li>
                  <select id="filterDropdown" value={filterCategory} className={styles.upperSelect} onChange={(e) =>{setFilterCategory(e.target.value); console.log(filterCategory) }}>
                        {filterCategories.map((filterCategory)=> {
                            return <option key={filterCategory.value} value={filterCategory.value}>{filterCategory.label}</option>
                        })}
                    </select>
                </li>
                <li>
                  <button className={styles.upperButton} onClick={() => {setAddOpen(!addOpen)}}>Add a product</button>
                </li>
                <li>
                  <input placeholder="Search" className={styles.searchBar} type="text" onChange={(e => setQuery(e.target.value))} />
                </li>
                <li>
                  <button className={styles.upperButton} onClick={() => {setCartOpen(!cartOpen)}}>
                    My cart: <span className={styles.cartSpan}>{cart.length}</span>
                  </button>
                </li>
              </ul>
              <ul className={styles.productCardList}>
                {
                  displayItems.map((product) => (
                  <li key={product.id} className={styles.productCard} onClick={() => {navigate(`/product/${product.id}`)}}>
                    <img src={product.productImage} />
                    <p>{product.productName}</p>
                    <ul>
                      <p>{product.productPrice}</p>
                        <button onClick={() =>{
                        setCart([...cart, product]);
                        }}><SlBasket color="white" fontSize="20px"/></button>
                    </ul>
                  </li> ))
                  }
              </ul>
              <Pages currentPage={currentPage} setCurrentPage={setCurrentPage} displayItems={displayItems}/>
            </div>
        </main>
    </div>
  )
}

export default Main