import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./main/authPage/SignUp";
import LoginPage from "./main/authPage/LoginPage";
import JwtShow from "./main/Advertisement/JwtShow";
import SuccessSignUp from "./main/Advertisement/SuccessSignUp";
import ProtectedRoutes from "./main/protectedRoutes/ProtectedRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/success" element={<SuccessSignUp />} />
      <Route
        path="/jwt"
        element={
          <ProtectedRoutes>
            <JwtShow />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}
