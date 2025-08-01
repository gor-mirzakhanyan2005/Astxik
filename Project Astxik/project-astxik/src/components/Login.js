import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../auth';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

function Home() {
  const {loggedIn} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSignInActive, setIsSignInActive] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if(password !== confirm){
      alert("Passwords don't match");
      setPassword("");
      setConfirm("");
      return;
    }

   if(!isSignInActive){
    setIsSignInActive(true);
    await doSignInWithEmailAndPassword(email, password);
   }
  }

  return (
    <div className="App">
      {loggedIn && (<Navigate to={'/home'} replace={true}/>)}
      <form className="signForm">
        <h2>Sign in</h2>
        <label htmlFor='email'>E-Mail</label>
        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required></input>
        <label htmlFor='password' >Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        <label htmlFor='repeatPassword'>Repeat Password</label>
        <input id="repeatPassword" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required></input>
        <hr></hr>
        <h2>Don't have an account? <Link to={{pathname: '/Register'}}>Sign Up.</Link></h2>
        <button onClick={handleSignUp}>Submit</button>
      </form>
      </div>
  )
}

export default Home