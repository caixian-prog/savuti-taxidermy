import React from 'react';

const OutfittersPHPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold transition-transform duration-500 transform hover:scale-105">
            Outfitters/PH
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <form className="bg-white p-6 rounded shadow-md space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Surname</label>
            <input
              type="text"
              placeholder="Enter surname"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Landline Number</label>
            <input
              type="text"
              placeholder="Enter landline number"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Region/Province/Address</label>
            <input
              type="text"
              placeholder="Enter region/province/address"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Save
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

export default OutfittersPHPage;
