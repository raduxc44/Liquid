import {createContext, useState, useEffect} from 'react';
import { db } from '../firebase';

interface userProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: Date;
}

export const UserContext = createContext<userProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: new Date()
});

export const UserProvider = ({children}: any) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (isUserLoggedIn) {
            sessionStorage.setItem("isUserLoggedIn", JSON.stringify(isUserLoggedIn));
        }
    }, [isUserLoggedIn]);
    
    // Restore selectedProductToShow from sessionStorage when the component is first rendered
    useEffect(() => {
        const storedIsUserLoggedIn = JSON.parse(sessionStorage.getItem("isUserLoggedIn") || "[]");
        if (storedIsUserLoggedIn) {
        setIsUserLoggedIn(storedIsUserLoggedIn);
        }
    }, [setIsUserLoggedIn]);

    return (
        <UserContext.Provider value={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthDate: new Date()
        }}>
            {children}
        </UserContext.Provider>
    );
};