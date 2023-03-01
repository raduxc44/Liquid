import { createContext, useState, useContext } from "react";

const AuthContext = createContext('a')

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider ({ }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // function signup(email, password) {
    //     return auth.createUserWithEmailAndPassword(email, password)
    // }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         setCurrentUser(user)
    //         setLoading(false)
    //     })

    //     return unsubscribe
    // }, [])

    // const value = {
    //     currentUser,
    //     signup
    // }

    return (
        'a'
    )
}