import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBJ7-4xQSCb2JUKt_gYRCqfftnZ52VFcPw',
  authDomain: 'pixense-317ec.firebaseapp.com',
  projectId: 'pixense-317ec',
  storageBucket: 'pixense-317ec.appspot.com',
  messagingSenderId: '65474351000',
  appId: '1:65474351000:web:dc9bc5e32ed1499138e5ed',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
