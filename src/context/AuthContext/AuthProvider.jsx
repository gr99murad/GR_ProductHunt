import React, { useEffect, useState } from 'react';
import auth from '../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password);l
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('state captured', currentUser)
            setLoading(false);
        })
        return () =>{
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;