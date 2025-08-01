import React, { useContext } from 'react';
import {useParams, Link} from 'react-router-dom';
import styles from '../stylesheets/ProductDetails.module.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './Home';

const ProductDetails = ({productData}) => {

  const {id} = useParams();
  const {cart, setCart} = useContext(CartContext)
  const product = productData.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();
  console.log(product);

  return (
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
  )
}

export default ProductDetails