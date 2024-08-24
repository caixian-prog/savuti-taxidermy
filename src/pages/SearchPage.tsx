import React, { useState } from 'react';

const SearchPage: React.FC = () => {
  const [searchType, setSearchType] = useState<'Name' | 'OrderNumber'>('Name');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold transition-transform duration-500 transform hover:scale-105">
            Search
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <form className="bg-white p-6 rounded shadow-md space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Search by</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Name"
                  checked={searchType === 'Name'}
                  onChange={() => setSearchType('Name')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Name / Surname / Mobile</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="OrderNumber"
                  checked={searchType === 'OrderNumber'}
                  onChange={() => setSearchType('OrderNumber')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Order Number</span>
              </label>
            </div>
          </div>

          {searchType === 'Name' && (
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium">Name / Surname / Mobile</label>
              <input
                type="text"
                placeholder="Enter name, surname, or mobile number"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {searchType === 'OrderNumber' && (
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium">Order Number</label>
              <input
                type="text"
                placeholder="Enter order number"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Search
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

export default SearchPage;
