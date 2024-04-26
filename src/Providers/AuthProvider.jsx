import { createContext, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export   const AuthContext = createContext(null);
 const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);

    const createUserWithEmail = (email, password) =>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
        
    }

    const signInWithEmail = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    
    const userInfo = {
        user,
        createUserWithEmail,
        signInWithEmail

    }
    return (
        <AuthContext.Provider value={userInfo}>
                {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;