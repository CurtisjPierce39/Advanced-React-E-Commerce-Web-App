import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../types/firebaseConfig';

export interface UserData {
    email: string;
    name: string;
    address?: string;
}

export const registerUser = async (
    email: string, 
    password: string, 
    userData: UserData
): Promise<void> => {
    // Implementation will go here
    return Promise.resolve();
};

export const authService = {
    async register(email: string, password: string, userData: UserData) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            ...userData,
            createdAt: new Date()
        });
        return userCredential.user;
    },

    async login(email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async logout() {
        await signOut(auth);
    }
};