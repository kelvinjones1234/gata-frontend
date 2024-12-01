import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContex";
import FormDataContext from "../context/FormDataContext";

import {
  User,
  Mail,
  Building2,
  CreditCard,
  GraduationCap,
  BookOpen,
  Check,
} from "lucide-react";

const Payment = () => {
  const [formData, setFormData] = useState({
    matriculationNumber: "",
    fullName: "",
    email: "",
    department: "",
    selectedLevel: "",
    semester: "",
    selectedFee: null,
    selectedSemester: "",
    amount: "",
  });

  const [fees, setFees] = useState([]);
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const { handleSubmit } = useContext(FormDataContext);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://schoolpaymentsystem.pythonanywhere.com/api/fees/${user.dept_id}/`)
        .then((response) => setFees(response.data));
    }

    axios.get("https://schoolpaymentsystem.pythonanywhere.com/api/other-data/").then((response) => {
      setLevels([...new Set(response.data.map((item) => item.level))]);
      setSemesters([...new Set(response.data.map((item) => item.semester))]);
    });
  }, [user]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.selectedLevel ||
      !formData.selectedSemester ||
      !formData.selectedFee
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    handleSubmit(
      formData.selectedFee.amount,
      formData.selectedFee.fee,
      formData.selectedFee.id,
      formData.selectedLevel,
      formData.selectedSemester
    ).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              School Fee Payment Portal
            </h2>
            <p className="text-indigo-100 text-center mt-2">
              Complete your payment securely and efficiently
            </p>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmitForm} className="p-8 space-y-6">
            {/* Student Identification Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={user.full_name}
                    required
                    readOnly
                    className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter Full Name"
                  />
                </div>
              </div>
              {/* Matriculation Number */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Matriculation Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="matriculationNumber"
                    value={user.username}
                    required
                    readOnly
                    className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter Matriculation Number"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    required
                    readOnly
                    className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="matriculation_number"
                    value={user.department}
                    required
                    readOnly
                    className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Level */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Academic Level
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="level"
                    value={formData.selectedLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        selectedLevel: e.target.value,
                      })
                    }
                    required
                    className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select Level</option>
                    {levels.map((level, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Semester */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Semester
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="semester"
                    value={formData.selectedSemester}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        selectedSemester: e.target.value,
                      })
                    }
                    required
                    className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((semester, index) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fee Type */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fee Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="fee"
                    id="fee"
                    onChange={(e) => {
                      const selectedFee = fees.find(
                        (item) => item.id === parseInt(e.target.value)
                      );
                      setFormData({ ...formData, selectedFee });
                    }}
                    required
                    className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select Fee Type</option>
                    {fees.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.fee}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Amount */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-6 w-6 text-slate-400">₦</div>
                </div>
                <input
                  type="text"
                  name="amount"
                  value={
                    formData.selectedFee ? formData.selectedFee.amount : ""
                  }
                  readOnly
                  min="0"
                  step="0.01"
                  className="pl-10 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter Payment Amount"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  "Proceed to payment"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">
              Secure payment powered by SchoolPay | All transactions are
              encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
