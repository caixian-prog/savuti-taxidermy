import React, { useState } from 'react';

const NewOrderPage: React.FC = () => {
  const [orderItems, setOrderItems] = useState([{ species: '', itemReceived: '', instructions: '', price: '' }]);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { species: '', itemReceived: '', instructions: '', price: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...orderItems];
    updatedItems.splice(index, 1);
    setOrderItems(updatedItems);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrderItems(updatedItems);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold transition-transform duration-500 transform hover:scale-105">
            New Order
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <form className="bg-white p-6 rounded shadow-md space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Date</label>
            <input
              type="date"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Order Number</label>
            <input
              type="text"
              placeholder="Auto-generated"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              disabled
            />
          </div>

          {orderItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Species"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={item.species}
                onChange={(e) => handleChange(index, 'species', e.target.value)}
              />
              <input
                type="text"
                placeholder="Item Received"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={item.itemReceived}
                onChange={(e) => handleChange(index, 'itemReceived', e.target.value)}
              />
              <input
                type="text"
                placeholder="Instructions"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={item.instructions}
                onChange={(e) => handleChange(index, 'instructions', e.target.value)}
              />
              <input
                type="text"
                placeholder="Price"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={item.price}
                onChange={(e) => handleChange(index, 'price', e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="col-span-1 md:col-span-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Remove Item
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddItem}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Add Another Item
          </button>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Deposit Received</label>
            <input
              type="text"
              placeholder="Enter deposit received"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Outstanding Balance</label>
            <input
              type="text"
              placeholder="Enter outstanding balance"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Currency Option</label>
            <select className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Send Order to Customer
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

export default NewOrderPage;
