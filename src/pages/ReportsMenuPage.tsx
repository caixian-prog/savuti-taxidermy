import React from 'react';

const ReportsMenuPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold transition-transform duration-500 transform hover:scale-105">
            Reports Menu
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <form className="bg-white p-6 rounded shadow-md space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Outstanding Balance/Payment</label>
            <input
              type="text"
              placeholder="Enter criteria for outstanding balance/payment"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Incomplete Orders</label>
            <input
              type="text"
              placeholder="Enter criteria for incomplete orders"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Outstanding Deposit Payment</label>
            <input
              type="text"
              placeholder="Enter criteria for outstanding deposit payment"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Flatskins Paid/Not Sent to Tannery</label>
            <input
              type="text"
              placeholder="Enter criteria for flatskins paid/not sent to tannery"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Flatskins Not Paid</label>
            <input
              type="text"
              placeholder="Enter criteria for flatskins not paid"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">List of Capes for Each Species</label>
            <input
              type="text"
              placeholder="Enter criteria for list of capes for each species"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">List All Capes (Completed or Incomplete)</label>
            <input
              type="text"
              placeholder="Enter criteria for list all capes"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Generate Report
          </button>
        </form>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8 shadow-inner">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Savuti Taxidermy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ReportsMenuPage;
