import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("inside auth state change", currentUser);
      if (currentUser == null || currentUser.emailVerified)
        setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   1. sign in with google
  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //   2 register
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   3 Signin
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 4 logout
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   5 update profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //   6 email verify
  const emailVerify = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    providerLogin,
    LogOut,
    updateUserProfile,
    creatUser,
    emailVerify,
    signIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
