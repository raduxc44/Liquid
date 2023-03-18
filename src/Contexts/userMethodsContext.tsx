import {createContext, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { db } from '../firebase';
import { Item } from '../data/types';

interface UserMethodsContextType {
    addToCart: (item: Item) => void;
    removeFromCart: (item: Item) => void;
    checkIfFavorite: (item: Item) => boolean;
    addToFavorites: (item: Item) => void;
    removeFromFavorites: (item: Item) => void;
    addToOrders: (order: any) => void;
}

export const UserMethodsContext = createContext<UserMethodsContextType>({
    addToCart: () => {},
    removeFromCart: () => {},
    checkIfFavorite: () => false,
    addToFavorites: () => {},
    removeFromFavorites: () => {},
    addToOrders: () => {},
});

export const UserMethodsProvider = ({children}: any) => {
    const [user, setUser] = useState<any>(null);
    const [cart, setCart] = useState<any>([]);
    const [favorites, setFavorites] = useState<any>([]);
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const getUserData = async () => {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    const userData = userDoc.data();
                    if (userData) {
                        setCart(userData.cart);
                        setFavorites(userData.favorites);
                        setOrders(userData.orders);
                    }
                };
                getUserData();
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const addToCart = (item: any) => {
        if(user) {
            const newCart = [...cart, item];
            setCart(newCart);
            updateDoc(doc(db, 'users', user.uid), {cart: newCart});
        }
    };

    const removeFromCart = (item: Item) => {
        if(user) {
            const newCart = cart.filter((cartItem: Item) => cartItem.imageTag !== item.imageTag);
            setCart(newCart);
            updateDoc(doc(db, 'users', user.uid), {cart: newCart});
        }
    };

    const checkIfFavorite = (item: Item) => {
        if(user) {
            if(
                favorites.filter((favoriteItem: Item) => favoriteItem.imageTag === item.imageTag).length > 0
            ) {
                return true;
            }
            else {
                return false;
            }
        }
        else return false;
    };

    const addToFavorites = (item: Item) => {
        if(user) {
            if(
                checkIfFavorite(item) === true
            ) return;
            const newFavorites = [...favorites, item];
            setFavorites(newFavorites);
            updateDoc(doc(db, 'users', user.uid), {favorites: newFavorites});
        }
    };

    const removeFromFavorites = (item: Item) => {
        if(user) {
            const newFavorites = favorites.filter((favoriteItem: any) => favoriteItem.imageTag !== item.imageTag);
            setFavorites(newFavorites);
            updateDoc(doc(db, 'users', user.uid), {favorites: newFavorites});
        }
    };

    const addToOrders = (order: any) => {
        if(user) {
            const newOrders = [...orders, 'new order'];
            setOrders(newOrders);
            updateDoc(doc(db, 'users', user.uid), {orders: newOrders});
        }
    };

    
    return (
        <UserMethodsContext.Provider value={{
            addToCart,
            removeFromCart,
            checkIfFavorite,
            addToFavorites,
            removeFromFavorites,
            addToOrders,
        }}>
            {children}
        </UserMethodsContext.Provider>
    );
};