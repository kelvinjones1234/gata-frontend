import React, { useState, useEffect, useContext } from "react";
import { FileText, Search, Download } from "lucide-react";
import AuthContext from "../context/AuthContex";
import axios from "axios";
import { Link } from "react-router-dom";

const History = () => {
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    semester: "",
    department: "",
    level: "",
  });

  const { authTokens, user } = useContext(AuthContext);

  // Fetch payment records
  useEffect(() => {
    const fetchPaymentRecords = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/transactions/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        setPaymentRecords(response.data);
        setFilteredRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment records:", error);
        setLoading(false);
      }
    };

    fetchPaymentRecords();
  }, [authTokens]);

  console.log(paymentRecords);

  useEffect(() => {
    let result = paymentRecords;

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (record) =>
          record.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.semester) {
      result = result.filter((record) => record.semester === filters.semester);
    }

    if (filters.level) {
      result = result.filter((record) => record.level === filters.level);
    }

    setFilteredRecords(result);
  }, [searchTerm, filters, paymentRecords]);

  const uniqueSemesters = [
    ...new Set(paymentRecords.map((record) => record.semester)),
  ];

  const uniqueLevels = [
    ...new Set(paymentRecords.map((record) => record.level)),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading payment records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 bg-gray-50 flex flex-wrap items-center gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search by name, matriculation number, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search
                size={20}
                className="absolute left-3 top-3 text-gray-400"
              />
            </div>

            {/* Semester Filter */}
            <select
              value={filters.semester}
              onChange={(e) =>
                setFilters({ ...filters, semester: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Semesters</option>
              {uniqueSemesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={filters.level}
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              {uniqueLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Page Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Payment History
            </h1>
          </div>

          {/* Payment Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matriculation No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.department.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.fee.fee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      ₦{record.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.fee.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.reference_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        to={`/receipt-page/?trxref=${record.reference_number}&reference=${record.reference_number}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-[.8rem] leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                            />
                          </svg>
                          Print Receipt
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredRecords.length === 0 && (
              <div className="text-center py-10">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No payment records found</p>
              </div>
            )}
          </div>

          {/* Pagination (Optional - can be added later) */}
          {filteredRecords.length > 0 && (
            <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-gray-700">
                Showing {filteredRecords.length} of {paymentRecords.length}{" "}
                records
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
