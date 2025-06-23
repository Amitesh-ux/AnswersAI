import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * TypeScript interface defining the shape of our authentication context
 * Provides type safety for all authentication-related functions and state
 */
interface AuthContextType {
  currentUser: User | null;                                    // Currently authenticated user or null
  login: (email: string, password: string) => Promise<void>;   // Email/password login function
  signup: (email: string, password: string) => Promise<void>;  // User registration function
  logout: () => Promise<void>;                                 // User logout function
  loginWithGoogle: () => Promise<void>;                        // Google OAuth login function
  loading: boolean;                                            // Loading state during auth operations
}

// Create React context for authentication state management
// Undefined initially, will be provided by AuthProvider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access authentication context
 * Throws error if used outside of AuthProvider to prevent undefined context access
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Authentication Provider Component
 * Manages authentication state and provides auth functions to child components
 * Note: Claude AI assisted with Firebase authentication setup and error handling patterns
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State for currently authenticated user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Loading state to prevent rendering before auth state is determined
  const [loading, setLoading] = useState(true);

  /**
   * User registration function using email and password
   * Creates new user account with Firebase Authentication
   */
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password).then(() => { });
  }

  /**
   * User login function using email and password
   * Authenticates existing user with Firebase Authentication
   */
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password).then(() => { });
  }

  /**
   * User logout function
   * Signs out current user from Firebase Authentication
   */
  function logout() {
    return signOut(auth);
  }

  /**
   * Google OAuth login function
   * Provides social login capability using Google accounts
   * Note: Claude AI assisted with Google OAuth provider setup
   */
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(() => { });
  }

  /**
   * Effect hook to listen for authentication state changes
   * Automatically updates user state when login/logout occurs
   * Runs once on component mount and cleans up on unmount
   */
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update current user state with authenticated user or null
      setCurrentUser(user);
      // Set loading to false once auth state is determined
      setLoading(false);
    });

    // Cleanup function to unsubscribe from auth state listener
    return unsubscribe;
  }, []);

  // Create context value object with all authentication functions and state
  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginWithGoogle,
    loading
  };

  // Provide authentication context to child components
  // Only render children after loading is complete to prevent auth flicker
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}