import React from 'react';

const AddUserPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold transition-transform duration-500 transform hover:scale-105">
            Add User
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <form className="bg-white p-6 rounded shadow-md space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Role</label>
            <select className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Create User
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

export default AddUserPage;
