import './Cart-Cont.css'
import { useState, useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Item } from '../../data/types'
import { useNavigate } from 'react-router-dom'
import { SelectedProdContext } from '../../Contexts/selectedProductContext'
import { UserMethodsContext } from '../../Contexts/userMethodsContext'
import * as Material from '@mui/material'

function CartCont () {

    type CartItem = {
        quantity: number,
        item: Item
    }
    type Cart = CartItem[] | []

    const navigate = useNavigate()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [cart, setCart] = useState<Cart>([])
    const { setSelectedProductToShow } = useContext(SelectedProdContext)
    const { handleIncrement, handleDecrement, removeFromCart } = useContext(UserMethodsContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const userRef = doc(db, 'users', user.uid)
                onSnapshot(userRef, (doc) => {
                    if(doc.exists()) {
                        setUser(doc.data())
                        setCart(doc.data().cart)
                        setIsUserLoggedIn(true)
                    }
                    else {
                        setIsUserLoggedIn(false)
                    }
                })
            }
            else {
                setIsUserLoggedIn(false)
            }
        });
    }, []);

    const sideButtonsStyles = {
        background: 'black',
        color: 'goldenrod',
        height: '100%',
        minWidth: '25%',
        maxWidth: '25%',
    };
    const CustomDisableInput = Material.styled(Material.TextField)(() => ({
        ".MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "gold"
        }
    }));

    return (
        <div className='cart-preview-container animate__animated'>
            {isUserLoggedIn ? (
                <div className='cart-preview'>
                    <div className='cart-preview-cart'>
                        {
                            cart.length > 0 ? (
                                <ul className='cart-list'>
                                    {cart.map((cartItem, index) => {
                                        return (
                                            <li className='cart-item' key={index}
                                                onClick={() => {
                                                    setSelectedProductToShow(cartItem.item)
                                                    navigate(`/product/${cartItem.item.name}`);
                                                }}
                                            >
                                                <div className='cart-item-details'>
                                                    <p>{cartItem.item.name}</p>
                                                    <p>{cartItem.item.quantity}/{cartItem.item.strength}</p>
                                                    <Material.Box className="quantity-container" 
                                                        sx={{ 
                                                            background: 'black',
                                                            display: "flex",
                                                            placeContent: "center",
                                                            height: {xs: '10%', sm: '20%', md: '30%'},
                                                            width: {xs: '50%', sm: '50%', md: '50%'},
                                                            borderRadius: '15px'
                                                        }}>
                                                        <Material.Button onClick={() => handleDecrement(cartItem.item)} style={sideButtonsStyles}>-</Material.Button>
                                                        <CustomDisableInput
                                                            type="text"
                                                            value={cartItem.quantity}
                                                            disabled
                                                            className='QuantityInput'
                                                            sx={{
                                                                width: '50%',
                                                                height: '100%',
                                                                color: 'white',
                                                                borderLeft: '1px solid goldenrod',
                                                                borderRight: '1px solid goldenrod',
                                                            }}
                                                            inputProps={{
                                                                max: 99,
                                                                min: 0,
                                                                sx: {
                                                                    width: '100%',
                                                                    height: 'inherit',
                                                                    textAlign: 'center'
                                                                },
                                                            }}
                                                            InputProps={{   
                                                                sx: {
                                                                    color: 'white',
                                                                    height: 'inherit',
                                                                    width: '100%',
                                                                },
                                                            }}
                                                        />
                                                        <Material.Button onClick={() => handleIncrement(cartItem.item)} style={sideButtonsStyles}>+</Material.Button>
                                                        </Material.Box>
                                                </div>
                                                <img src={require(`../../images/${cartItem.item.category}/desktop/${cartItem.item.imageTag}.webp`)} alt="" />
                                                <span
                                                    onClick={() => removeFromCart(cartItem.item)}
                                                    className="material-symbols-outlined favorite-remove">
                                                        remove_shopping_cart
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                <div className='cart-preview'>
                                    <div className='cart-empty'>
                                        <p className='logo-auth'>Liquid</p>
                                        <p>Your cart is empty!</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                ) 
                : 
                (
                <div className='cart-preview'>
                    <div>
                        <p className='logo-auth'>Liquid</p>
                        <p>Sign in to start shopping right away!</p>
                    </div>
                </div>
            ) 
            }
        </div>
    )
}
export default CartCont