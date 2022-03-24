import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAS1SVHVH6RhV9f_WsaqY62xvVyFDxI47I',
  authDomain: 'web-shop-dp.firebaseapp.com',
  projectId: 'web-shop-dp',
  storageBucket: 'web-shop-dp.appspot.com',
  messagingSenderId: '705835615062',
  appId: '1:705835615062:web:0d13fa6f1851c13d290cf7',
  measurementId: 'G-LXTPQM2GWX'
};

const app = initializeApp(config);
const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', userAuth.uid);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(doc(db, 'users', userAuth.uid), {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const auth = getAuth();
export const signUpWithPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithGoogle = () => signInWithPopup(auth, provider);
