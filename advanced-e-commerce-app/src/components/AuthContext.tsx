import { createContext, useContext, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../types/firebaseConfig';

interface AuthContextType {
    user: any;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, loading] = useAuthState(auth);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);