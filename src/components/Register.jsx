import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContex";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    matricNumber: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registerUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/departments/"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching department data:", error);
        setErrors((prev) => ({
          ...prev,
          general: "Failed to load departments. Please try again later.",
        }));
      }
    };
    fetchDepartments();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    // Matriculation Number validation
    if (!formData.matricNumber.trim()) {
      newErrors.matricNumber = "Matriculation Number is required";
    } else if (
      !/^(20\d{2})(\/1)?\/\d{6}[a-zA-Z]{2}$/.test(formData.matricNumber)
    ) {
      newErrors.matricNumber = "Invalid matriculation number format";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format (11 digits)";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous general errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.general;
      return newErrors;
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual registration logic
      const response = await registerUser(formData);

      // Handle successful registration
      console.log("Registration successful", response);

      // Optionally: redirect or show success message
    } catch (error) {
      // Handle registration errors
      setErrors((prev) => ({
        ...prev,
        general:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-20 h-20 bg-indigo-600 rounded-full mx-auto flex items-center justify-center">
          <User size={40} className="text-white" />
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
          Student Portal Registration
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Create an account to access your portal
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
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-slate-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-500 sm:text-sm ${
                    errors.fullName
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>
            {/* Department Field */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-slate-700"
              >
                Department
              </label>
              <div className="mt-1">
                <select
                  id="department"
                  name="department"
                  className={`block w-full pl-3 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm ${
                    errors.department
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.department}
                    </option>
                  ))}
                </select>
              </div>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>
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
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-500 sm:text-sm ${
                    errors.matricNumber
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500"
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
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-500 sm:text-sm ${
                    errors.email
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={20} className="text-slate-400" />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-500 sm:text-sm ${
                    errors.phoneNumber
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber}
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
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-500 sm:text-sm ${
                    errors.password
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 mb-5 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-500 sm:text-sm ${
                    errors.confirmPassword
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <span className="bg-white text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="text-blue-500 hover:text-blue-800"
              >
                Register
              </Link>
            </span>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
