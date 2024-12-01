import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContex";
import { FileText, Printer } from "lucide-react";
import logo from "../assets/img/bida_logo.jpeg";

const Receipt = () => {
  const { user } = useContext(AuthContext);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);
  const [postSubmitted, setPostSubmitted] = useState(false);
  const PAYSTACK_SECRET_KEY =
    "sk_test_d77866a8e1822e78b4b62e5742e645de0fbf721e";

  const location = useLocation();

  const getTransactionReference = () => {
    const query = new URLSearchParams(location.search);
    return query.get("reference");
  };

  useEffect(() => {
    const fetchTransactionData = async () => {
      const reference = getTransactionReference();
      if (reference) {
        try {
          const paystackResponse = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
              },
            }
          );
          const data = paystackResponse.data.data;
          setTransactionData(data);
        } catch (error) {
          console.error("Error fetching transaction data:", error);
          setError("Failed to fetch transaction data. Please try again later.");
        }
      } else {
        setError("No transaction reference found in URL.");
      }
    };

    fetchTransactionData();
  }, [location.search, user.email]);






  useEffect(() => {
    const postTransactionData = async () => {
      if (transactionData && !postSubmitted) {
        try {
          await axios.post(
            `http://localhost:8000/api/transaction/`,
            {
              matriculation_number: user.user_id,
              full_name: user.full_name,
              email: user.email,
              department: user.dept_id,
              fee: transactionData.metadata.fee_id,
              amount: transactionData.metadata.amount,
              paid: transactionData.status === "success",
              reference_number: transactionData.reference,
              level: transactionData.metadata.level,
              semester: transactionData.metadata.semester,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setPostSubmitted(true);
        } catch (error) {
          console.error("Error posting transaction data:", error);
          setError("Failed to post transaction data. Please try again later.");
        }
      }
    };

    postTransactionData();
  }, [transactionData, postSubmitted]);








  const printReceipt = () => {
    const printContents = document.getElementById("print-receipt").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore original content
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div
          id="print-receipt"
          className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden"
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {transactionData ? (
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div>
                  <h1 className="text-[1.8rem] font-extrabold text-blue-600 flex items-center">
                    <img
                      src={logo}
                      alt=""
                      className="mr-3 mb-2 text-blue-600 h-10 w-10"
                    />
                    Official Receipt
                  </h1>
                  <p className="text-gray-500 mt-2">
                    PAYMENT CONFIRMATION FOR {transactionData.metadata.level}{" "}
                    {transactionData.metadata.semester}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Date: {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Reference: {transactionData.reference}
                  </p>
                </div>
              </div>

              {/* Student & Transaction Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">
                    Student Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Name:</strong> {user.full_name}
                    </p>
                    <p className="text-gray-700">
                      <strong>Matriculation:</strong> {user.username}
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-gray-700">
                      <strong>Department:</strong>{" "}
                      {transactionData.metadata.department}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">
                    Transaction Details
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Transaction ID:</strong> {transactionData.id}
                    </p>
                    <p className="text-gray-700">
                      <strong>Fee Type:</strong> {transactionData.metadata.fee}
                    </p>
                    <p className="text-gray-700">
                      <strong>Payment Status:</strong>
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {transactionData.status === "success"
                          ? "Successful"
                          : "Pending"}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <strong>Amount Paid:</strong>{" "}
                      {transactionData.amount / 100} NGN
                    </p>
                  </div>
                </div>
              </div>

              {/* Total and Print */}
              <div className="flex justify-between items-center border-t pt-6">
                <p className="text-gray-500 italic">
                  Thank you for your prompt payment.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-blue-700">
                    Total: {transactionData.amount / 100} NGN
                  </span>
                  <button
                    onClick={printReceipt}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Printer className="mr-2" size={20} />
                    Print Receipt
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-xl">
                Loading transaction details...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Receipt;
