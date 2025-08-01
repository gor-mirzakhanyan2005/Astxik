import React from 'react';
import { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '../auth';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
  const {loggedIn} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if(password !== confirm){
      alert("Passwords don't match");
      setPassword("");
      setConfirm("");
      return;
    }
    console.log(password);

    if(!isSignUpActive){
      setIsSignUpActive(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
    // createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         console.log(user);
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(error.code, error.message)
    //     })
  }

  return (
    <div className="App">
      {loggedIn && (<Navigate to={'/home'} replace={true}/>)}
      <form className="signForm">
        <h2>Create an account</h2>
        <label htmlFor='email'>E-Mail</label>
        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required></input>
        <label htmlFor='password' >Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        <label htmlFor='repeatPassword'>Repeat Password</label>
        <input id="repeatPassword" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required></input>
        <hr></hr>
        <h2>Already have an account? <Link to={{pathname: '/'}}>Sign In.</Link></h2>
        <button onClick={handleSignUp}>Submit</button>
      </form>
      </div>
  )
}

export default Home