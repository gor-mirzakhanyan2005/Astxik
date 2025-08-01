import React from 'react'
import styles from '../stylesheets/Footer.module.css'

const Footer = ({about, setAbout, profileOpen, setProfileOpen}) => {
  return (
    <div className={styles.footer}>
        <ul>
            <li>
                <button>Home</button>
            </li>
            <li>
                <button>Our items</button>
            </li>
            <li>
                <button onClick={() => setAbout(!about)}>About us</button>
            </li>
            <li>
                <button onClick={() => setProfileOpen(!profileOpen)}>Profile</button>
            </li>
        </ul>
    </div>
  )
}

export default Footer