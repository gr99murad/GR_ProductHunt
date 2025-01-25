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

    const signInUser = async (email, password) => {
        setLoading(true);
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email,password);
            const currentUser = userCredential.user;


            await saveUserInfo(currentUser);
            setUser(currentUser);
        }catch(error){
            console.error("Error signing in user", error);
        }
    }

    const signOutUser = async () => {
        setLoading(true);
        try{
            await signOut(auth);
            setUser(null);
        }catch(error){
            console.error('Error signing out user', error);
        }
        
    };

    const saveUserInfo = async (currentUser) => {
        const { email, displayName, photoURL, uid} = currentUser;

        // check if the user exist in database
        const response = await fetch(`http://localhost:5000/users/${email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                name: displayName || "unnamed",
                image: photoURL || "",
                role: "user",
            }),
        });
        
        const result = await response.json();
        if(result?.acknowledged){
            console.log('User info saved in DB');
        } else{
            console.error('failed to save user info');
        }
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            
            if(currentUser){
                setUser(currentUser);
                await saveUserInfo(currentUser);
            }
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