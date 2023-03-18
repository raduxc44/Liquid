import './Fav-Cont.css'
import { useState, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Item } from '../../data/types'
import { useNavigate } from 'react-router-dom'
import { SelectedProdContext } from '../../Contexts/selectedProductContext'

function FavCont () {

    const navigate = useNavigate()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [favorites, setFavorites] = useState<Item[]>([])
    const { setSelectedProductToShow } = useContext(SelectedProdContext)

    onAuthStateChanged(auth, (user) => {
        if(user) {
            const userFavoritesRef = doc(db, 'users', user.uid)
            onSnapshot(userFavoritesRef, (doc) => {
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

    return (
        <div className='favorites-preview-container animate__animated'>
            {isUserLoggedIn ? (
                <div className='favorites-preview'>
                    <div className='favorites-preview__user-info'>
                        <p>{user.displayName}</p>
                    </div>
                    <div className='favorites-preview__favorites'>
                        <ul className='favorites-list'>
                            {favorites.map((item, index) => {
                                return (
                                    <li className='favorite-item' key={index}
                                        onClick={() => {
                                            setSelectedProductToShow(item)
                                            navigate(`/product/${item.name}`);
                                        }}
                                    >
                                        <div className='favorite-details'>
                                            <p>{item.name}</p>
                                            <p>{item.quantity}/{item.strength}</p>
                                        </div>
                                        <img src={require(`../../images/${item.category}/desktop/${item.imageTag}.webp`)} alt="" />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                ) 
                : 
                (
                <div className='account-preview'>
                    <div className='account-preview__user-info'>
                        <p>a</p>
                    </div>
                </div>
            ) 
            }
        </div>
    )
}
export default FavCont