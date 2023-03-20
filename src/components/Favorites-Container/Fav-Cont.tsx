import './Fav-Cont.css'
import { useState, useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Item } from '../../data/types'
import { useNavigate } from 'react-router-dom'
import { SelectedProdContext } from '../../Contexts/selectedProductContext'
import { UserMethodsContext } from '../../Contexts/userMethodsContext'

function FavCont () {

    const navigate = useNavigate()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [favorites, setFavorites] = useState<Item[]>([])
    const { setSelectedProductToShow } = useContext(SelectedProdContext)
    const { removeFromFavorites } = useContext(UserMethodsContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const userRef = doc(db, 'users', user.uid)
                onSnapshot(userRef, (doc) => {
                    if(doc.exists()) {
                        setUser(doc.data())
                        setFavorites(doc.data().favorites)
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
        <div className='favorites-preview-container animate__animated'>
            {isUserLoggedIn ? (
                <div className='favorites-preview'>
                    <div className='favorites-preview__favorites'>
                        {
                            favorites.length > 0 ? (
                                <ul className='favorites-list'>
                                    {favorites.map((item, index) => {
                                        return (
                                            <li className='favorite-item' key={index}
                                            >
                                                <div className='favorite-details'>
                                                    <p>{item.name}</p>
                                                    <p>{item.quantity}/{item.strength}</p>
                                                </div>
                                                <img 
                                                onClick={() => {
                                                    setSelectedProductToShow(item)
                                                    navigate(`/product/${item.name}`);
                                                }}
                                                src={require(`../../images/${item.category}/desktop/${item.imageTag}.webp`)} alt="" />
                                                <span 
                                                    onClick={() => removeFromFavorites(item)}
                                                    className="material-symbols-outlined favorite-remove">
                                                    heart_broken
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                <div className='favorites-empty'>
                                    <p className='logo-auth'>Liquid</p>
                                    <p>You have no favorites yet.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                ) 
                : 
                (
                <div className='account-preview'>
                    <div>
                        <p className='logo-auth'>Liquid</p>
                        <p>Sign in to see your favorites</p>
                    </div>
                </div>
                ) 
            }
        </div>
    )
}
export default FavCont