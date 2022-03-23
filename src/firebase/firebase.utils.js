import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAS1SVHVH6RhV9f_WsaqY62xvVyFDxI47I',
  authDomain: 'web-shop-dp.firebaseapp.com',
  projectId: 'web-shop-dp',
  storageBucket: 'web-shop-dp.appspot.com',
  messagingSenderId: '705835615062',
  appId: '1:705835615062:web:0d13fa6f1851c13d290cf7',
  measurementId: 'G-LXTPQM2GWX'
};

initializeApp(config);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
