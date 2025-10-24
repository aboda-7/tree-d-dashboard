import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { useState, useEffect } from "react";
import { auth } from "./firebase";


import "./App.css";

const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard"));
const Languages = React.lazy(() => import("./pages/languages/languages"));
const Artifacts = React.lazy(() => import("./pages/artifacts/artifacts"));
const LanguageDetail = React.lazy(() => import("./pages/languages/language_detail"));
const Handsets = React.lazy(() => import("./pages/handsets/handsets"));
const NotFound = React.lazy(() => import("./pages/not-found/not-found"));
const Login = React.lazy(() => import("./pages/auth/login"));
const Signup = React.lazy(() => import("./pages/auth/signup"));

// 🧩 ProtectedRoute component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if (!user || !token) {
    console.warn("Access blocked — no token or user");
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {
  useEffect(() => {
    console.log("User from Firebase Auth:", auth.currentUser);
    console.log("Token from localStorage:", localStorage.getItem("firebaseToken"));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ each protected page wrapped individually */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/languages"
          element={
            <ProtectedRoute>
              <Languages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artifacts"
          element={
            <ProtectedRoute>
              <Artifacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/languages/:id"
          element={
            <ProtectedRoute>
              <LanguageDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/handsets"
          element={
            <ProtectedRoute>
              <Handsets />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
