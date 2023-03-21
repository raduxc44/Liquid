import './Order-History.css';
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { SelectedProdContext } from '../../Contexts/selectedProductContext';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                onSnapshot(doc(db, "users", user.uid), (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        if (data) {
                            const { orders } = data;
                            setOrders(orders.sort((a:any, b:any) =>  b.date.toDate() - a.date.toDate()));
                        }
                    }
                })
            }
        })
    }, [])

    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const {setSelectedProductToShow} = useContext(SelectedProdContext);

    return (
        <div className="order-history-container">
            <h1>Your order history</h1>
            <ul className="order-history-list">
                {orders.map((order, index) => {
                    return (
                        <div className="order" key={index}>
                            <div className="order-header">
                                <h2>Order #{Math.floor(Math.random() * 10000)}</h2>
                                <h3>Your items</h3>
                            </div>
                            <ul className="order-items-list">
                                {
                                    order.orderItems.map((item: any, index: number) => {
                                        return (
                                            <li onClick={() => {
                                                setSelectedProductToShow(item.item);
                                                navigate(`/product/${item.item.name}`);  
                                            }} className="order-item" key={index}>
                                                <p>{item.item.name}</p>
                                                <p>{item.quantity}x ${item.item.price}</p>
                                                <img src={require(`../../images/${item.item.category}/desktop/${item.item.imageTag}.webp`)} alt="" />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className='order-footer'>
                                <p>Paid with: {order.paymentMethod}</p>
                                <p>Total: ${order.totalPrice}</p>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default OrderHistory;