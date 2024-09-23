declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}
import React, { useEffect, useState } from "react";

import data from "./product.json/product.json";

interface Product {
  id: number;
  title: string;
  company: string;
  description: string;
  category: string;
  image: string;
  price: string;
  shipping: boolean;
  colors: string[];
}

const Produkt: React.FC = () => {
  const [malumod, setMalumod] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [cartby, setCartby] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  useEffect(() => {
    setMalumod(data as Product[]);
  }, []);

  const filterlash = () => {
    let filteredData = [...data] as Product[];

    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedOption) {
      filteredData = filteredData.filter(
        (item) => item.category === selectedOption
      );
    }

    if (sortOrder) {
      filteredData = filteredData.filter((item) =>
        item.company.toLowerCase().includes(sortOrder.toLowerCase())
      );
    }

    if (priceRange) {
      filteredData = filteredData.filter(
        (item) => parseFloat(item.price) <= priceRange
      );
    }

    if (isChecked) {
      filteredData = filteredData.filter((item) => item.shipping === isChecked);
    }

    if (cartby === "a-z") {
      filteredData = filteredData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (cartby === "z-a") {
      filteredData = filteredData.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if (cartby === "high") {
      filteredData = filteredData.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    } else if (cartby === "low") {
      filteredData = filteredData.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }

    setMalumod(filteredData);
  };

  const tozalash = () => {
    setMalumod(data as Product[]);
    setIsChecked(true);
    setPriceRange(100000);
    setSortOrder("");
    setSelectedOption("");
    setSearchTerm("");
    setCartby("");
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "429c535a-81c8-4327-bff2-82cb8221f90a";

    const s = document.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <form className="container mx-auto shadow-lg rounded-lg bg-white p-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search Product
            </label>
            <input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
            />
          </div>
          <div>
            <label
              htmlFor="option"
              className="block text-sm font-medium text-gray-700"
            >
              Select Category
            </label>
            <select
              id="option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All</option>
              <option>Tables</option>
              <option>Chairs</option>
              <option>Kids</option>
              <option>Sofas</option>
              <option>Beds</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="sortOrder"
              className="block text-sm font-medium text-gray-700"
            >
              Select Company
            </label>
            <input
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
            />
          </div>
          <div>
            <label
              htmlFor="sortOrder"
              className="block text-sm font-medium text-gray-700"
            >
              Sort By
            </label>
            <select
              id="sortOrder"
              value={cartby}
              onChange={(e) => setCartby(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">a-z</option>
              <option>a-z</option>
              <option>z-a</option>
              <option>high</option>
              <option>low</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="priceRange"
              className="block text-sm font-medium text-gray-700 flex justify-between"
            >
              <span>Select Price</span>
              <span>${priceRange.toLocaleString()}</span>
            </label>
            <input
              id="priceRange"
              type="range"
              min="0"
              max="100000"
              step="1"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="checkbox"
              className="block text-sm font-medium text-gray-700"
            >
              Free shipping
            </label>
            <input
              onChange={() => setIsChecked(!isChecked)}
              type="checkbox"
              name="shipping"
              className="mt-2 checkbox"
              checked={isChecked}
            />
          </div>
          <button
            type="button"
            onClick={filterlash}
            className="btn btn-primary w-full mt-4"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={tozalash}
            className="btn btn-secondary w-full mt-4"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="container mx-auto mt-8">
        <p className="text-lg font-medium text-gray-700">
          {malumod.length} Products
        </p>
        <div className="mt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {malumod &&
            malumod.map((e) => (
              <div key={e.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="relative h-56">
                  <img
                    className="w-full h-full object-cover rounded-t-md"
                    src={e.image}
                    alt="card-image"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    {capitalizeFirstLetter(e.title)}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">{e.description}</p>
                  <p className="mt-4 text-indigo-500">${e.price}</p>
                  <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg w-full hover:bg-indigo-700 transition duration-200">
                    Read More
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Produkt;
