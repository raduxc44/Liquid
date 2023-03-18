import {createContext, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { db } from '../firebase';
import { Item } from '../data/types';

export const UserMethodsContext = createContext({
    addToCart: (item: Item) => {},
    removeFromCart: (item: Item) => {},
    addToFavorites: (item: Item) => {},
    removeFromFavorites: (item: Item) => {},
    addToOrders: (order: any) => {},
});

export const UserProvider = ({children}: any) => {
    const [user, setUser] = useState<any>(null);
    const [cart, setCart] = useState<any>([]);
    const [favorites, setFavorites] = useState<any>([]);
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userRef);
                const userDocData = userDocSnap.data();
                if(userDocData) {
                    setCart(userDocData.cart);
                    setFavorites(userDocData.favorites);
                    setOrders(userDocData.orders);
                }
            } else {
                setUser(null);
            }
        });
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

    const addToFavorites = (item: Item) => {
        if(user) {
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
            addToFavorites,
            removeFromFavorites,
            addToOrders,
        }}>
            {children}
        </UserMethodsContext.Provider>
    );
};