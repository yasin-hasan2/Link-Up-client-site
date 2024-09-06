/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //create user
    const createUser = (email , password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update profile
    const profileUpdate = (name, photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // sign in

    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    // google login
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // password reset
    const passReset = (email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    // Email verification
	const verifyEmail = () => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			return sendEmailVerification(currentUser);
		}
	};

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=> unSubscribe()

    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        profileUpdate,
        signIn,
        logOut,
        googleLogin,
        passReset,
        verifyEmail
    }
    return ( 
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;