import React from 'react';
import styles from '../stylesheets/Nav.module.css';

function Nav({profileOpen, setProfileOpen, about, setAbout}) {
  return (
    <div>
        <nav className={styles.navBackground}>
            <ul className={styles.navUl}>
                <li>
                    <button>Home</button>
                </li>
                <li>
                    <button>Our items</button>
                </li>
                <li>
                    <button onClick={() => {setAbout(!about)}}>About us</button>
                </li>
                <li>
                    <button onClick={() => {setProfileOpen(!profileOpen)}}>Profile</button>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Nav

// {loggedIn ?
//                     <>
//                         <button className={styles.navLink} onClick={() => doSignOut().then(() => { navigate("/login") })}>Sign out</button>
//                     </>
//                     :
//                     <>
//                         <button className={styles.navLink} onClick={navigate("/login")}>Sign in</button>
//                     </>
//                     }