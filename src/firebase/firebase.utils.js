import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch
} from 'firebase/firestore';
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
export const db = getFirestore(app);

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const collectionRef = doc(collection(db, collectionKey));
    batch.set(collectionRef, obj);
  });

  return await batch.commit();
};

export const convertedCollectionsSnapshotToMap = (collections) => {
  const transformCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformCollections.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const auth = getAuth();
export const signUpWithPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signInWithGoogle = () => signInWithPopup(auth, provider);
