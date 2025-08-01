import React from 'react';
import styles from "../stylesheets/Nav.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingScreen}>
        <div className={styles.loadingCircle}></div>
    </div>
  )
}

export default Loading