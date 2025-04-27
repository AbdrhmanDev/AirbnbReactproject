import React, { createContext, useState } from 'react';

export const AuthContext = createContext();
// استنا لحد ما نعمل تسجيل الدخول بحساب جوجل وحساب العادي واعمل الكونتيكست علشان القيمه تبقي متغيره في نفس اللحظه 
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
