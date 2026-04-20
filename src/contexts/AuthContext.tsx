import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiClient } from '@/lib/api-client';

interface User {
    id: string;
    email?: string;
    user_metadata?: any;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    logout: () => Promise<void>;
    signup: (data: any) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const handleOAuthCallback = () => {
            const hash = window.location.hash;
            if (hash && (hash.includes('access_token=') || hash.includes('id_token='))) {
                const params = new URLSearchParams(hash.substring(1));
                const accessToken = params.get('access_token');
                
                if (accessToken) {
                    localStorage.setItem('auth_token', accessToken);
                    localStorage.setItem('isAuthenticated', 'true');
                    window.location.hash = ''; // Clear hash
                    return true;
                }
            }
            return false;
        };

        const checkAuth = async () => {
            const hasOAuthToken = handleOAuthCallback();
            const token = localStorage.getItem('auth_token');
            
            if (!token && !hasOAuthToken) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await apiClient.get('/auth/me');
                setUser(response.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('isAuthenticated');
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const response = await apiClient.get('/auth/google');
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Failed to initiate Google login:', error);
            throw error;
        }
    };

    const login = async (credentials: any) => {
        const response = await apiClient.post('/auth/login', credentials);
        const { session, user } = response.data;
        
        if (session?.access_token) {
            localStorage.setItem('auth_token', session.access_token);
            localStorage.setItem('isAuthenticated', 'true');
            setUser(user);
            setIsAuthenticated(true);
        }
    };

    const signup = async (data: any) => {
        const response = await apiClient.post('/auth/signup', data);
        const { session, user } = response.data;
        
        if (session?.access_token) {
            localStorage.setItem('auth_token', session.access_token);
            localStorage.setItem('isAuthenticated', 'true');
            setUser(user);
            setIsAuthenticated(true);
        }
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/logout');
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('isAuthenticated');
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, signup, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
