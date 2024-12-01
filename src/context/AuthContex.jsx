import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async (matricNumber, password) => {
    console.log(matricNumber);
    try {
      if (!matricNumber || !password) {
        alert("Email and password are required for logging in");
        return;
      }

      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: matricNumber.toLowerCase(),
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/home-page/");
      } else {
        console.error("Login failed:", response.statusText);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("An error occurred during login. Please try again.");
    }
  };

  const registerUser = async (fullFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup/",
        {
          username: fullFormData.matricNumber.toLowerCase(),
          full_name: fullFormData.fullName,
          email: fullFormData.email,
          department: fullFormData.department,
          phone_number: fullFormData.phoneNumber,
          password: fullFormData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const AuthContextData = {
    register,
    user,
    authTokens,
    registerUser,
    loginUser,
    setRegister,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
