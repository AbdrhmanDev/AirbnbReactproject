import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem('token');
            setToken(updatedToken);
            setIsAuthenticated(!!updatedToken);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
      useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // تحديث حالة التوثيق بناءً على الـ token
    }, [localStorage.getItem('token')]); 

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
