import {createContext, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { db } from '../firebase';
import { Item } from '../data/types';

interface UserMethodsContextType {
    addToCart: (item: Item, quantity: number) => void;
    removeFromCart: (item: Item) => void;
    cartCounter: number;
    checkIfFavorite: (item: Item) => boolean;
    addToFavorites: (item: Item) => void;
    removeFromFavorites: (item: Item) => void;
    favoritesCounter: number;
    addToOrders: (order: any) => void;
}

export const UserMethodsContext = createContext<UserMethodsContextType>({
    addToCart: () => {},
    removeFromCart: () => {},
    cartCounter: 0,
    checkIfFavorite: () => false,
    addToFavorites: () => {},
    removeFromFavorites: () => {},
    favoritesCounter: 0,
    addToOrders: () => {},
});

export const UserMethodsProvider = ({children}: any) => {
    const [user, setUser] = useState<any>(null);
    const [cart, setCart] = useState<any>([]);
    const [cartCounter, setCartCounter] = useState<number>(0);
    const [favorites, setFavorites] = useState<any>([]);
    const [favoritesCounter, setFavoritesCounter] = useState<number>(0);
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
                        setCartCounter(userData.cart.length);
                        setFavorites(userData.favorites);
                        setFavoritesCounter(userData.favorites.length);
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

    const addToCart = (item: Item, quantity: number) => {
        if(user) {
            const alreadyInCart = cart.find((cartItem: any) => cartItem.item.imageTag === item.imageTag);
            if(alreadyInCart){
                const updatedCart = cart.map((cartItem: any) => {
                    if(cartItem.item.imageTag === item.imageTag) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + quantity
                        };
                    }
                    else {
                        return cartItem;
                    }
                });
                setCart(updatedCart);
                updateDoc(doc(db, 'users', user.uid), {cart: updatedCart});
            }
            else {
                const updatedCart = [...cart, {item, quantity}];
                const updatedCartCounter = cartCounter + 1;
                setCart(updatedCart);
                setCartCounter(updatedCartCounter);
                updateDoc(doc(db, 'users', user.uid), {cart: updatedCart});
            }
        }
    };

    const removeFromCart = (item: Item) => {
        if(user) {
            const newCart = cart.filter((cartItem: any) => cartItem.item.imageTag !== item.imageTag);
            const newCartCounter = cartCounter - 1;
            setCart(newCart);
            setCartCounter(newCartCounter);
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
            const newFavoritesCounter = favoritesCounter + 1;
            setFavorites(newFavorites);
            setFavoritesCounter(newFavoritesCounter);
            updateDoc(doc(db, 'users', user.uid), {favorites: newFavorites});
        }
    };

    const removeFromFavorites = (item: Item) => {
        if(user) {
            const newFavorites = favorites.filter((favoriteItem: any) => favoriteItem.imageTag !== item.imageTag);
            const newFavoritesCounter = favoritesCounter - 1;
            setFavorites(newFavorites);
            setFavoritesCounter(newFavoritesCounter);
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
            cartCounter,
            checkIfFavorite,
            addToFavorites,
            removeFromFavorites,
            favoritesCounter,
            addToOrders,
        }}>
            {children}
        </UserMethodsContext.Provider>
    );
};