import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { firebase, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

//We create context
const AuthContext = React.createContext();

//We create function that lets us use context
export function useAuth(){
    return useContext(AuthContext);
}

//We create auth component
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)

        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if(user){
            setUser({...user});
            setLoggedIn(true);
        } else{
            setUser(null);
            setLoggedIn(false);
        }
        setLoading(false);
    }

    const authInfo = {
        user,
        loggedIn,
        loading
    }

    return(
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
