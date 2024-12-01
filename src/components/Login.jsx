import React, { useState, useContext } from "react";
import { User, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContex";
const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    matricNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const validateForm = () => {
    const newErrors = {};

    // Matriculation Number validation
    if (!formData.matricNumber.trim()) {
      newErrors.matricNumber = "Matriculation number is required";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!validateForm()) return;

    setLoading(true);
    setErrors({}); // Clear any previous general errors

    try {
      await loginUser(formData.matricNumber, formData.password);
    } catch (error) {
      // Handle login error response
      setErrors((prev) => ({
        ...prev,
        general:
          error.response?.data?.message || "Login failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo/Icon */}
        <div className="w-20 h-20 bg-indigo-600 rounded-full mx-auto flex items-center justify-center">
          <User size={40} className="text-white" />
        </div>

        {/* Header Text */}
        <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
          Student Portal Login
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-lg sm:px-10">
          {/* General Error Message */}
          {errors.general && (
            <div className="mb-4 flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Matriculation Number Field */}
            <div>
              <label
                htmlFor="matricNumber"
                className="block text-sm font-medium text-slate-700"
              >
                Matriculation Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-slate-400" />
                </div>
                <input
                  id="matricNumber"
                  name="matricNumber"
                  type="text"
                  autoComplete="username"
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm ${
                    errors.matricNumber
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  placeholder="Enter your matriculation number"
                  value={formData.matricNumber}
                  onChange={handleChange}
                />
              </div>
              {errors.matricNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.matricNumber}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm ${
                    errors.password
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <span className="bg-white text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-500 hover:text-blue-800"
                >
                  Register
                </Link>
              </span>
              <span className="bg-white text-sm text-slate-500">
                <Link
                  to={"/forgot-password"}
                  className="text-blue-500 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
