import { useContext, useState, createContext, useEffect } from "react";
import AuthContext from "./AuthContex";
const FormDataContext = createContext();

export default FormDataContext;

export const FormDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (
    feeAmount,
    feeName,
    feeId,
    selectedLevel,
    selectedSemester
  ) => {
    pay(feeAmount, feeName, feeId, selectedLevel, selectedSemester);
  };

  const PAYSTACK_SECRET_KEY =
    "sk_test_d77866a8e1822e78b4b62e5742e645de0fbf721e";

  const pay = async (
    feeAmount,
    feeName,
    feeId,
    selectedLevel,
    selectedSemester
  ) => {
    try {
      const userData = {
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        department: user.department,
        department_id: user.department_id,
        fee: feeName,
        fee_id: feeId,
        amount: feeAmount,
        level: selectedLevel,
        semester: selectedSemester,
        matriculation_number: user.username,
      };

      const metadata = {
        ...userData,
      };

      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
          body: JSON.stringify({
            amount: feeAmount * 100, // Amount should be in kobo for Paystack
            currency: "NGN",
            email: user.email,
            callback_url: "https://schoolfeepaymentsystem.vercel.app/receipt-page/",
            metadata: metadata,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.status) {
        window.location.replace(data.data.authorization_url);
      } else {
        console.error("Payment failed:", data.message);
      }
    } catch (error) {
      console.error("Error occurred while initializing payment:", error);
    }
  };

  const formDataData = {
    handleSubmit: handleSubmit,
  };

  return (
    <FormDataContext.Provider value={formDataData}>
      {children}
    </FormDataContext.Provider>
  );
};
