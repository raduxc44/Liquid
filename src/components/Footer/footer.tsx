import './footer.css'
import Heart from '../../images/Icons/heart.svg'
import React from '../../images/Icons/react.svg'
import Firebase from '../../images/Icons/firebase.svg'

export default function Footer () {
    return(
        <footer>
            <p>© 2023<span className='logo logo-foot'>Liquid</span></p>
            <p>Made with 
                <img src={Heart} alt="" />
                ,
                <img src={React} alt="" />
                and 
                <img src={Firebase} alt="" />
            </p>
        </footer>
    )
}