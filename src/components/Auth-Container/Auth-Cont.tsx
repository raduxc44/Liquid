import './Auth-Cont.css'
import { useState } from 'react'
import {
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
        } from 'firebase/auth'
import { auth, db } from '../../firebase'

function AuthCont () {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [selectedForm, setSelectedForm] = useState('signUp')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    onAuthStateChanged(auth, (user) => {
        if (user && !isUserLoggedIn) {
            setIsUserLoggedIn(true);
        } else if (!user && isUserLoggedIn) {
            setIsUserLoggedIn(false);
        }
    });

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => setIsUserLoggedIn(true))
            .catch((error) => console.log(error));
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    const handleSignInWithEmailPassword = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => setIsUserLoggedIn(true))
            .catch((error) => {
                console.log(error); 
            });
    };
    
    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => setIsUserLoggedIn(true))
            .catch((error) => console.log(error));
    };

    return (
        <div className='account-preview-container animate__animated'>
            {(!isUserLoggedIn && selectedForm === 'signIn') &&
            <form onSubmit={(e) => handleSignInWithEmailPassword(e)}>
                <div className='account-form-container'>
                    <p className='logo-auth'>Liquid</p> 
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="text" 
                        placeholder='Email'
                    />
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        placeholder='Password'
                    />
                    <button type='submit'></button>
                </div>
                <div className='account-form-btns'>
                    <div onClick={handleSignInWithGoogle}>Sign in with Google</div>
                    <div onClick={() => setSelectedForm('signUp')}>Don't have an account? Sign up</div>
                </div>
            </form>
            }
            {(!isUserLoggedIn && selectedForm === 'signUp') &&
            <form onSubmit={(e) => handleSignUp(e)}>
                <p className='logo-auth'>Liquid</p>
                <div className='account-form-container'>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        placeholder='First Name'
                    />
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder='Last Name'
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder='Email'
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Password'
                    />
                    <button type='submit'></button>
                </div>
                <div className='account-form-btns'>
                    <div onClick={handleSignInWithGoogle}>Sign in with Google</div>
                    <div onClick={() => setSelectedForm('signIn')}>Already have an account? Sign in</div>
                </div>
            </form>
            }
            {isUserLoggedIn && 
            <div>
                <img src="" alt="" />
                <p>First Name</p>
                <p>Last Name</p>
                <p>Email</p>
                <div onClick={() => auth.signOut()}>Log out</div>
            </div>
            }
        </div>
    )
}
export default AuthCont