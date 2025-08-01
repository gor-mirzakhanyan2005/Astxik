import React, { useContext } from 'react'
import styles from "../stylesheets/Cart.module.css";
import { useEffect } from 'react';
import { CartContext } from './Home';

const Cart = ({cartOpen, setCartOpen, setCart, removeItem}) => {

  const cart = useContext(CartContext);

  return (
    <div className={styles.shoppingCart}>
        <div className={styles.cartContainer}>
            <ul>
                {cart.map((product) => (
                  <li>
                    <div className={styles.cartCard}>
                      <img src={product.productImage} />
                      <div className={styles.cartCardText}>
                        <p>{product.productName}</p>
                        <p>{product.productPrice}</p>
                        <div className={styles.cartCardButtons}>
                          <button onClick={() => {
                            console.log(product.productName);
                            const index = cart.findIndex(item => item.productName === product.productName);
                            setCart(cart.filter(item => item.productName !== product.productName));
                            // removeItem(product.id)
                          }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <button className={styles.checkoutButton} onClick={() => setCartOpen(!cartOpen)}>Go back</button>
            <button className={styles.checkoutButton}>Proceed to checkout</button>
        </div>
    </div>
  )
}

export default Cart