import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Check local storage for mock session
      const mockSession = localStorage.getItem('mock_admin_user');
      if (mockSession) {
        setUser({ email: mockSession });
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    if (!isFirebaseConfigured) {
      if (email === 'admin@digitalsurvey.com' && password === 'adminpassword') {
        setUser({ email });
        localStorage.setItem('mock_admin_user', email);
        return { user: { email } };
      } else {
        throw new Error("Invalid mock credentials. Try admin@digitalsurvey.com / adminpassword");
      }
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!isFirebaseConfigured) {
      setUser(null);
      localStorage.removeItem('mock_admin_user');
      return;
    }
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
