import React from "react";
import { Link } from "react-router-dom";
import {
  ROUTE_ADDNEWCUSTOMERPAGE,
  ROUTE_ADDUSERPAGE,
  ROUTE_FREIGHTAGENTSPAGE,
  ROUTE_NEWORDERPAGE,
  ROUTE_OUTFITTERSPHPAGE,
  ROUTE_REPORTSMENUPAGE,
  ROUTE_SEARCHPAGE,
} from "../navigation/routes";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold transition-transform duration-500 transform hover:scale-105">
            Savuti Taxidermy
          </h1>
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Login
          </button>
        </div>
      </header>

      <nav className="bg-gray-200 p-4 shadow-sm">
        <div className="container mx-auto flex justify-around space-x-4">
          <Link
            to={ROUTE_ADDNEWCUSTOMERPAGE}
            className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300"
          >
            Add New Customer
          </Link>
          <Link
            to={ROUTE_SEARCHPAGE}
            className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300"
          >
            Search
          </Link>
          <Link
            to={ROUTE_NEWORDERPAGE}
            className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300"
          >
            New Order
          </Link>
          <Link
            to={ROUTE_OUTFITTERSPHPAGE}
            className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300"
          >
            Outfitters/PH
          </Link>
          <Link
            to={ROUTE_FREIGHTAGENTSPAGE}
            className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300"
          >
            Freight Agents
          </Link>
          <Link
            to={ROUTE_REPORTSMENUPAGE}
            className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300"
          >
            Reports Menu
          </Link>
          <Link
            to={ROUTE_ADDUSERPAGE}
            className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300"
          >
            Add User
          </Link>
        </div>
      </nav>

      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">
          Welcome to Savuti Taxidermy
        </h2>
        <p className="text-lg text-gray-600 animate-fade-in">
          Manage your taxidermy orders, customers, and reports efficiently with
          our custom-built software.
        </p>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8 shadow-inner">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Savuti Taxidermy. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
