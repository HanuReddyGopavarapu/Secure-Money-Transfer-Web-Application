import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";

const Dashboard = ({ user }) => {
  const [balance, setBalance] = useState(0);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE}/account/bal`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.bal);
      } catch (error) {
        console.error("Failed to fetch balance", error);
      }
    };
    fetchBalance();
  }, [balance]);

  useEffect(() => {
    const searchUsers = async () => {
      if (!search) {
        setUsers([]);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE}/user/search?filter=${search}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.user);
      } catch (error) {
        console.error("Failed to search users", error);
      }
    };
    searchUsers();
  }, [search]);

  const handleTransfer = (userId) => {
    navigate(`/transfer?recipientId=${userId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-lg mt-4">Account Balance: ${balance}</p>

      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-3 my-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {users.length > 0 && (
        <ul className="bg-white p-4 rounded-lg shadow">
          {users.map((user) => (
            <li key={user} className="p-3 border-b flex justify-between items-center">
              <h1 className="font-semibold">{user.username}</h1>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={() => handleTransfer(user._id)}
              >
                Transfer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;