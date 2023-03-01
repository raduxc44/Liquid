import './Auth-Cont.css'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword ,signInWithPopup } from 'firebase/auth'
import {auth} from '../../firebase'

function AuthCont () {

    // createUserWithEmailAndPassword(auth, email, password).then((auth) => {
    //     if(auth) {
    //         console.log(auth)
    //     }
    // })
    // .catch (error => alert(error.message))
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            console.log(result.user)
        }
        catch (error) {
            console.log(error)
        }
    }
    
    

    return (
        <div className='account-preview-container'>
            <p className='logo'>Liquid</p>
            <form>
                <div className='account-form-container'>
                    <input type="text" placeholder='Email'/>
                    <input type="text" placeholder='Password'/>
                </div>
                <div className='account-form-btns'>
                    <div>Sign up</div>
                    <div onClick={GoogleLogin}>Sign in with Google</div>
                    <div>Sign in with Apple</div>
                </div>
            </form>
        </div>
    )
}
export default AuthCont
// if(!isUserLoggedIn) {
//     return (
//         <div className='account-preview-container'>
//             <p className='logo'>Liquid</p>
//             <div className='account-form-container'>
//                 <input type="text" placeholder='Email'/>
//                 <input type="text" placeholder='Password'/>
//             </div>
//             <div className='account-form-btns'>
//                 <button>Sign up</button>
//                 <div>Sign in with Google</div>
//             </div>
//         </div>
//     )
// }