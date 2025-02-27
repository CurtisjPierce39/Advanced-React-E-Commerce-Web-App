import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtG_5ozi3T1AmaK-vFk_COMADk2vcD_dY",
    authDomain: "advanced-e-commerce-web-app.firebaseapp.com",
    projectId: "advanced-e-commerce-web-app",
    storageBucket: "advanced-e-commerce-web-app.firebasestorage.app",
    messagingSenderId: "498588235931",
    appId: "1:498588235931:web:13a9ae60c03839047bee3e"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app)

export { auth };
export { db };
