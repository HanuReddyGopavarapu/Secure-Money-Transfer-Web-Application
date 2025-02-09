import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";

const Transfer = ({ user }) => {
  const [transferData, setTransferData] = useState({ recipient: "", amount: "" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const recipientId = queryParams.get("recipientId");
    if (recipientId) {
      setTransferData({ ...transferData, recipient: recipientId });
    }
  }, [location]);

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE}/account/transfer`,
        { to: transferData.recipient, amount: transferData.amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Transfer Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Transfer failed", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Transfer Money</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="recipient"
          placeholder="Recipient ID"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={transferData.recipient}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Send Money
        </button>
      </form>
    </div>
  );
};

export default Transfer;