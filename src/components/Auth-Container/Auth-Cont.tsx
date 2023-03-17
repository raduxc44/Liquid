import './Auth-Cont.css'
import { useState } from 'react'
import {
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
        } from 'firebase/auth'
import { auth, db, updateProfile } from '../../firebase'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'

function AuthCont () {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [selectedForm, setSelectedForm] = useState('signUp')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const displayName = `${firstName} ${lastName}`
    let signedInId = ''

    onAuthStateChanged(auth, (user) => {
        if (user && !isUserLoggedIn) {
            setIsUserLoggedIn(true);
            setUser(user)
            signedInId = user.uid
        } else if (!user && isUserLoggedIn) {
            setIsUserLoggedIn(false);
            setUser(null)
            signedInId = ''
        }
    });

    const handleSignUp = async (e: React.FormEvent) => {
        const calculateAge = (birthDate: string) => {
            const today = new Date();
            const birthDateArr = birthDate.split('-');
            const birthDateObj = new Date(Number(birthDateArr[0]), Number(birthDateArr[1]), Number(birthDateArr[2]));
            let age = today.getFullYear() - birthDateObj.getFullYear();
            const month = today.getMonth() - birthDateObj.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
                age--;
            }
            return age;
        };
        const age = calculateAge(birthDate);
        if(age < 18) {
            alert('You must be 18 years old or older to register.');
            return;
        }
        e.preventDefault();
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, {
            displayName: displayName
        });
        await setDoc(doc(db, 'users', displayName), {
            id: user.uid,
            firstName,
            lastName,
            email,
            birthDate,
            age,
            createdAt: new Date()
        });
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
    
    const handleSignInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {
                setIsUserLoggedIn(true)
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = async () => {
        if(auth.currentUser) {
            if(window.confirm('Are you sure you want to delete your account?')) {
                await deleteDoc(doc(db, 'users', user.displayName));
                auth.currentUser.delete()
                    .then(() => {
                        setIsUserLoggedIn(false);
                        setUser(null);
                    })
                    .catch((error) => console.log(error));
                }
            }
            
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
                    <button type='submit'>Sign In</button>
                </div>
                <div className='account-form-btns'>
                    <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
                    <button onClick={() => setSelectedForm('signUp')}>Don't have an account? Sign up</button>
                </div>
            </form>
            }
            {(!isUserLoggedIn && selectedForm === 'signUp') &&
            <form onSubmit={(e) => handleSignUp(e)}>
                <p className='logo-auth'>Liquid</p>
                <div className='account-form-container'>
                    <input
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        placeholder='First Name'
                    />
                    <input
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder='Last Name'
                    />
                    <input
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder='Email'
                    />
                    <input
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Password'
                    />
                    <label htmlFor="birthDate">Birth Date</label>
                    <input
                        required
                        onChange={(e) => setBirthDate(e.target.value)}
                        type="date"
                        placeholder='Birth Date'
                    />
                    <button className='account-form-btns' type='submit'>Register</button>
                </div>
                <div className='account-form-btns'>
                    <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
                    <button onClick={() => setSelectedForm('signIn')}>Already have an account? Sign in</button>
                </div>
            </form>
            }
            {isUserLoggedIn && 
            <div className='logged-container'>
                <p className='logo-auth'>Liquid</p>
                <div className='logged-user-info'>
                    <p>{auth.currentUser?.displayName}</p>
                    <p>{auth.currentUser?.email}</p>
                    <button>Order History</button>
                    <button onClick={() => auth.signOut()}>Log out</button>
                    <button onClick={() => handleDelete()}>Delete Account</button>
                </div>
            </div>
            }
        </div>
    )
}
export default AuthCont