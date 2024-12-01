import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContex";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import { FormDataProvider } from "./context/FormDataContext";
import RecieptPage from "./pages/RecieptPage";
import HistoryPage from "./pages/HistoryPage";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FormDataProvider>
          <Routes>
            <Route element={<HomePage />} path="home-page/" />
            <Route element={<LoginPage />} path="login/" />
            <Route element={<RegisterPage />} path="register/" />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/payment-history" element={<HistoryPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/receipt-page" element={<RecieptPage />} />
            </Route>
          </Routes>
        </FormDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
