import React, { useState } from 'react';

const AddNewCustomerPage: React.FC = () => {
  const [customerType, setCustomerType] = useState<'Local' | 'Export'>('Local');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold transition-transform duration-500 transform hover:scale-105">
            Add New Customer
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <form className="bg-white p-6 rounded shadow-md space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter customer's name"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Surname</label>
            <input
              type="text"
              placeholder="Enter customer's surname"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter customer's email"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter customer's mobile number"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Alternative Contact Number</label>
            <input
              type="text"
              placeholder="Enter alternative contact number"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Customer Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Local"
                  checked={customerType === 'Local'}
                  onChange={() => setCustomerType('Local')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Local</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Export"
                  checked={customerType === 'Export'}
                  onChange={() => setCustomerType('Export')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Export</span>
              </label>
            </div>
          </div>

          {customerType === 'Export' && (
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Outfitter</label>
                <input
                  type="text"
                  placeholder="Enter outfitter"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">PH</label>
                <input
                  type="text"
                  placeholder="Enter PH"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Residing Country</label>
                <input
                  type="text"
                  placeholder="Enter residing country"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Freight Agent</label>
                <input
                  type="text"
                  placeholder="Enter freight agent"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
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

export default AddNewCustomerPage;
