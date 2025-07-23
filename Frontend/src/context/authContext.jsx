import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'

const authContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return(
        <authContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = ()=> useContext(authContext);