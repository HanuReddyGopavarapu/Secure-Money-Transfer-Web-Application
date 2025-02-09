import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-purple-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Money Transfer App
        </Link>
        <div>
          {user ? ( // If user is logged in, show "Sign Out"
            <button
              onClick={onLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          ) : ( // If user is not logged in, show "Sign In" and "Sign Up"
            <>
              <Link to="/signin" className="mr-4 hover:underline">
                Sign In
              </Link>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;