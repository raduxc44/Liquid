import "./Checkout-Order.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useContext} from "react";
import { Item } from "../../data/types";
import * as Material from '@mui/material'
import { SelectedProdContext } from "../../Contexts/selectedProductContext";
import { UserMethodsContext } from "../../Contexts/userMethodsContext";
import { useNavigate } from "react-router-dom";

const CheckoutOrder = () => {
    type CartItem = {
        quantity: number;
        item: Item;
    };
    type Cart = CartItem[] | [];

    const navigate = useNavigate();
    const [cart, setCart] = useState<any>([]);
    const [user, setUser] = useState<any>(null);
    const [order, setOrder] = useState<any>({});
    const { handleIncrement, handleDecrement, removeFromCart } = useContext(UserMethodsContext);
    const { setSelectedProductToShow } = useContext(SelectedProdContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                setUser(doc.data());
                setCart(doc.data().cart);
            } else {
                console.log("No such document!");
            }
            });
        } else {
            console.log("No user is signed in!");
        }
        });
    }, []);

    const sideButtonsStyles = {
        background: 'black',
        color: 'goldenrod',
        border: '1px solid goldenrod',
        height: '100%',
        minWidth: '25%',
        maxWidth: '25%',
    };
    const CustomDisableInput = Material.styled(Material.TextField)(() => ({
        ".MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black"
        }
    }));

    return (
        <div className="checkout-order">
        <h2>Your order</h2>
            <div className="checkout-cart-container">
                <ul className="checkout-cart-list">
                    {cart.map((cartItem: CartItem, index: number) => {
                        return (
                            <li
                                className="checkout-cart-item"
                                key={index}
                            >
                                <div className="checkout-cart-item-details">
                                    <p>{cartItem.item.name}</p>
                                    <p>
                                        {cartItem.item.quantity}/{cartItem.item.strength}
                                    </p>
                                    <Material.Box
                                        className="quantity-container"
                                        sx={{
                                        background: "gold",
                                        color: "black",
                                        display: "flex",
                                        placeContent: "center",
                                        height: { xs: "30%", sm: "30%", md: "30%" },
                                        width: { xs: "80%", sm: "50%", md: "50%" },
                                        borderRadius: "15px",
                                        }}
                                    >
                                        <Material.Button
                                        onClick={() => handleDecrement(cartItem.item)}
                                        style={sideButtonsStyles}
                                        >
                                        -
                                        </Material.Button>
                                        <CustomDisableInput
                                        type="text"
                                        value={cartItem.quantity}
                                        disabled
                                        className="QuantityInput"
                                        sx={{
                                            width: "50%",
                                            height: "100%",
                                            color: "black",
                                            borderLeft: "1px solid goldenrod",
                                            borderRight: "1px solid goldenrod",
                                        }}
                                        inputProps={{
                                            max: 99,
                                            min: 0,
                                            sx: {
                                            width: "100%",
                                            height: "inherit",
                                            color: 'black',
                                            textAlign: "center",
                                            },
                                        }}
                                        InputProps={{
                                            sx: {
                                            color: "black",
                                            height: "inherit",
                                            width: "100%",
                                            },
                                        }}
                                        />
                                        <Material.Button
                                        onClick={() => handleIncrement(cartItem.item)}
                                        style={sideButtonsStyles}
                                        >
                                        +
                                        </Material.Button>
                                    </Material.Box>
                                    <p>${cartItem.item.price * cartItem.quantity}</p>
                                </div>
                                    <img
                                    src={require(`../../images/${cartItem.item.category}/desktop/${cartItem.item.imageTag}.webp`)}
                                    alt=""
                                    onClick={() => {
                                        setSelectedProductToShow(cartItem.item);
                                        navigate(`/product/${cartItem.item.name}`);
                                    }}
                                    />
                                    <span
                                    onClick={() => removeFromCart(cartItem.item)}
                                    className="material-symbols-outlined favorite-remove"
                                    >
                                    remove_shopping_cart
                                    </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="pay-warn">
                <p>* Please use the following test credit card for payment *</p>
                <p>4242 4242 4242 4242 - Exp: 01/24 - CVV: 123</p>
            </div>
            <button className="pay-button">
                <span>Pay</span>
            </button>
        </div>
    );
};
export default CheckoutOrder;
