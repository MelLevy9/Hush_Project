import { useState, useEffect, createContext } from "react";
import { signIn, signOut, signUp } from '../services/authService';
import { loadUserDataFromCookie } from '../utils/authUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      const { userData, isAuthenticated } = await loadUserDataFromCookie();
      setUserData(userData);
      setIsAuthenticated(isAuthenticated);
    };
    initializeUser();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      const data = await signIn(email, password);
      setUserData(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('handleSignIn error:', error.response.status);
      alert('Invalid email or password.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
      setUserData(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('handleSignOut error:', error);
      alert('Sorry, something went wrong.');
    }
  };

  const handleSignUp = async (userName, email, password) => {
    try {
      const data = await signUp(userName, email, password);
      setUserData(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('handleSignUp error:', error.response.status);
      if (error.response.status === 409) {
        alert('User already exists');
      } else {
        alert('Invalid email or password.');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isAuthenticated,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};