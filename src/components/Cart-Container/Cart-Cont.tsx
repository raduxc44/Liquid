import './Cart-Cont.css'
import { useState, useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Item } from '../../data/types'
import { useNavigate } from 'react-router-dom'
import { SelectedProdContext } from '../../Contexts/selectedProductContext'
import { UserMethodsContext } from '../../Contexts/userMethodsContext'

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
    const { removeFromCart } = useContext(UserMethodsContext)

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

    return (
        <div className='cart-preview-container animate__animated'>
            {isUserLoggedIn ? (
                <div className='cart-preview'>
                    <div className='cart-preview-cart'>
                        <ul className='cart-list'>
                            {cart.map((cartItem, index) => {
                                return (
                                    <li className='cart-item' key={index}
                                        onClick={() => {
                                            setSelectedProductToShow(cartItem.item)
                                            navigate(`/product/${cartItem.item.name}`);
                                        }}
                                    >
                                        <div>
                                            <p>{cartItem.quantity}</p>
                                            <p>{cartItem.quantity * cartItem.item.price}</p>
                                        </div>
                                        <div className='cart-item-details'>
                                            <p>{cartItem.item.name}</p>
                                            <p>{cartItem.item.quantity}/{cartItem.item.strength}</p>
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