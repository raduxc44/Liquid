import './Auth-Cont.css'
import { useEffect, useState } from 'react'
import {
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged,
    sendPasswordResetEmail,
        } from 'firebase/auth'
import { auth, db, updateProfile } from '../../firebase'
import { doc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore'

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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && !isUserLoggedIn) {
                setIsUserLoggedIn(true);
                setUser(user)
            } else if (!user && isUserLoggedIn) {
                setIsUserLoggedIn(false);
                setUser(null)
            }
        });
    }, [isUserLoggedIn]);

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
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            firstName,
            lastName,
            email,
            birthDate,
            age,
            createdAt: new Date(),
            favorites: [],
            cart: [],
            orders: []
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
            .catch(() => {
                alert(`Autentication failed. Please check your email and password.`); 
            });
    };
    
    const handleGoogleSignIn = () => {
        if (window.innerWidth > 1000) {
            signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                setIsUserLoggedIn(true);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                updateProfile(user, {
                    displayName: user.displayName
                });
                setDoc(doc(db, 'users', user.uid), {
                    id: user.uid,
                    firstName: user.displayName?.split(' ')[0],  
                    lastName: user.displayName?.split(' ')[1],
                    email: user.email,
                    createdAt: new Date(),
                    favorites: [],
                    cart: [],
                    orders: []
                });
            })
            .catch((error) => console.log(error));
        } else {
            signInWithRedirect(auth, new GoogleAuthProvider());
            getRedirectResult(auth)
                .then((result) => {
                setIsUserLoggedIn(true);
                if (!result) return;
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                updateProfile(user, {
                    displayName: user.displayName,
                });
                setDoc(doc(db, "users", user.uid), {
                    id: user.uid,
                    firstName: user.displayName?.split(" ")[0],
                    lastName: user.displayName?.split(" ")[1],
                    email: user.email,
                    createdAt: new Date(),
                    favorites: [],
                    cart: [],
                    orders: [],
                });
                })
            .catch((error) => console.log(error));
        }
    };

    const handleDelete = async () => {
        if(auth.currentUser) {
            if(window.confirm('Are you sure you want to delete your account?')) {
                await deleteDoc(doc(db, 'users', auth.currentUser.uid));
                await auth.currentUser.delete();
                setIsUserLoggedIn(false);
            }
        }
    };

    const handleResetPass = async (e: React.FormEvent) => {
        e.preventDefault();
        const q = query(collection(db, 'users'), where('email', '==', email));
        const docsQ = await getDocs(q);
        const selectedUser = docsQ.docs[0].data();
        if(selectedUser) {
            sendPasswordResetEmail(auth, selectedUser.email)
                .then(() => {
                    alert('Password reset email sent.')
                })
                .catch((error) => {
                    console.log(error);
                });
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
                    <div className='account-form-btns'>
                        <button type='button' onClick={() => setSelectedForm('reset')}>Forgot Password?</button>
                        <button type='submit'>Sign In</button>
                    </div>
                </div>
                <div className='account-form-btns'>
                    <button type='button' onClick={handleGoogleSignIn}>Sign in with Google</button>
                    <button type='button' onClick={() => setSelectedForm('signUp')}>Don't have an account? Sign up</button>
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
                    <button type='submit'>Register</button>
                </div>
                <div className='account-form-btns'>
                    <button type='button' onClick={handleGoogleSignIn}>Sign in with Google</button>
                    <button type='button' onClick={() => setSelectedForm('signIn')}>Already have an account? Sign in</button>
                </div>
            </form>
            }
            {(!isUserLoggedIn && selectedForm === 'reset') &&
            <form onSubmit={(e) => handleResetPass(e)}>
                <p className='logo-auth'>Liquid</p>
                <div className='account-form-container'>
                    <input
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder='Email'
                    />
                    <button type='submit'>Reset Password</button>
                </div>
                <div className='account-form-btns'>
                    <button type='button' onClick={handleGoogleSignIn}>Sign in with Google</button>
                    <button type='button' onClick={() => setSelectedForm('signIn')}>Already have an account? Sign in</button>
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
                    <button type='button' onClick={() => auth.signOut()}>Log out</button>
                    <button type='button' onClick={() => handleDelete()}>Delete Account</button>
                </div>
            </div>
            }
        </div>
    )
}
export default AuthCont