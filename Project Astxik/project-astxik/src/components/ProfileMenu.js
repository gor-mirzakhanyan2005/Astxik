import React, { useEffect } from 'react';
import styles from "../stylesheets/Nav.module.css";
import { useAuth } from '../contexts/AuthContext';
import { doSignOut } from '../auth';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({profileOpen, setProfileOpen}) => {
  const {user, loading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user && !loading){
        navigate('/login');
    }
  }, [user, loading, navigate])

  return (
    <>
        {user ?
        <>
            <div className={styles.profileBackground}>
                <div className={styles.profileMenu}>
                    <button className={styles.profileButton} onClick={() => {setProfileOpen(!profileOpen)}}>Close</button>
                    <h2>My Profile</h2>
                    <h3>{user.email}</h3>
                    <button className={styles.profileButton} onClick={() => {doSignOut().then(() => navigate("/login"))}}>Log out</button>
                </div>
            </div>
        </>
        :
            navigate("/login")
    }
    </>
  )
}

export default ProfileMenu