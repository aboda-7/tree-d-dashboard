import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { auth } from "../firebase.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userToken = await getIdToken(firebaseUser, true);
      setUser(firebaseUser);
      setToken(userToken);
      localStorage.setItem("token", userToken); // ✅ save it
      console.log("Token saved to localStorage:", userToken);
    } else {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token"); // ✅ clear it
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
  };

  // ✅ Function to check if user is truly authenticated via token
  const isAuthenticated = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    try {
      const token = await getIdToken(currentUser, true); // refresh token
      return !!token;
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setAuthUser: setUser, logout, isAuthenticated }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
