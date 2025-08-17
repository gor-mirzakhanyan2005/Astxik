import React, { useContext } from 'react';
import {useParams, Link} from 'react-router-dom';
import styles from '../stylesheets/ProductDetails.module.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import { supabase } from '../supabase-client';
import { useQuery } from '@tanstack/react-query';
import Nav from './Nav';

const ProductDetails = () => {

  const {id} = useParams();
  const {cart, setCart} = useContext(CartContext);
  const fetchProducts = async() => {
        const {data, error} = await supabase
        .from('Products')
        .select('*');
  
          return data;
        };
  
  const productQuery = useQuery({queryKey: ["Products"], queryFn: fetchProducts})

  const products = productQuery.data ?? [];

  const product = products.find((product) => product.id === parseInt(id));
  const navigate = useNavigate();
  console.log(product);

  return (
    <>
    {productQuery?.data ? 
    <div className={styles.detailBackground}>
      <div className={styles.detailContainer}>
        <div className={styles.basicInfo}>
          <h1>{product.productName}</h1>
          <img src={product.productImage} />
          <h2>{product.productPrice}</h2>
        </div>
        <div className={styles.descAndAdd}>
          <p>{product.productDescription}</p>
          <div className={styles.buttons}>
            <button onClick={() => navigate(-1)}>Go back</button>
            <button onClick={() => setCart([...cart, product])}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    :
    <div>
      Loading...
    </div>
    }
    </>
  )
}

export default ProductDetails