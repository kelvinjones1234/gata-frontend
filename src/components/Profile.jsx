import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContex";
import { User, CreditCard, Clock, ChevronRight, FileText } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [studentInfo, setStudentInfo] = useState(null);
  const { authTokens, user } = useContext(AuthContext);
  const [transactionsData, setTransactionsData] = useState([]);
  const [unpaidFee, setUnpaidFee] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://schoolpaymentsystem.pythonanywhere.com/api/transactions/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        setTransactionsData(response.data);
      } catch (error) {
        console.error("Error fetching transactions data:", error);
      }
    };

    fetchTransactions();
  }, [authTokens]);

  useEffect(() => {
    axios
      .get("https://schoolpaymentsystem.pythonanywhere.com/api/user/summary/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const unpaid_fee = data.transaction_summary.unpaid_fees;
        setUnpaidFee(unpaid_fee);
        setStudentInfo({
          name: data.user.full_name,
          studentId: user.username,
          course: data.user.department,
          semester: "FPB",
          balance: data.transaction_summary.unpaid_fees[0]?.amount || 0,
          dueDate: "2024-12-15",
          totalFees: data.transaction_summary.total_fees,
          paidFees: data.transaction_summary.total_transactions,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!studentInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Loading student information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                <User size={40} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {studentInfo.name}
                </h1>
                <p className="text-gray-500 text-sm">
                  Matriculation Number: {studentInfo.studentId}
                </p>
                <p className="text-gray-500 text-sm">
                  {studentInfo.course} | {studentInfo.semester}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-gray-500 text-sm mb-2">Total Fees</h3>
            <p className="text-3xl font-bold text-gray-900">
              ₦{studentInfo.totalFees.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-gray-500 text-sm mb-2">Paid Amount</h3>
            <p className="text-3xl font-bold text-green-600">
              ₦{studentInfo.paidFees.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-gray-500 text-sm mb-2">Pending Amount</h3>
            <p className="text-3xl font-bold text-red-600">
              ₦{studentInfo.totalFees - studentInfo.paidFees.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment History */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md relative">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Payment History
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {transactionsData.slice(0, 2).map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CreditCard size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.fee.fee}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.fee.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ₦{transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <Link to={"/payment-history"}>
              <div className="absolute bottom-0 p-6 text-sm text-blue-700 hover:text-blue-500 transition-all duration-200 ease-in-out underline">
                View all payments
              </div>
            </Link>
          </div>

          {/* Upcoming Payments */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Unpaid Fees
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {unpaidFee.map((payment) => (
                <div
                  key={payment.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{payment.fee}</p>
                      <p className="text-sm text-gray-500">Due Soon</p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-600">
                    ₦{payment.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
