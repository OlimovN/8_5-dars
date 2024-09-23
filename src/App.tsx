declare global {
    interface Window {
      $crisp: any[];
      CRISP_WEBSITE_ID: string;
    }
  }
import React, {  useEffect, useState } from 'react';

import data from "./json/main.json";

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
    const [cartby, setCartby] = useState<string>('');
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
            filteredData = filteredData.filter((item) =>
                item.category === selectedOption
            );
        }

        if (sortOrder) {
            filteredData = filteredData.filter((item) =>
                item.company.toLowerCase().includes(sortOrder.toLowerCase())
            );
        }

        if (priceRange) {
            filteredData = filteredData.filter((item) =>
                parseFloat(item.price) <= priceRange
            );
        }

        if (isChecked) {
            filteredData = filteredData.filter((item) =>
                item.shipping === isChecked
            );
        }

        if (cartby === "a-z") {
            filteredData = filteredData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (cartby === "z-a") {
            filteredData = filteredData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (cartby === "high") {
            filteredData = filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (cartby === "low") {
            filteredData = filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
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
        <div>
            <div>
                <form className='max-w-[1100px] mx-auto drop-shadow-md' action="">
                    <div className='div-1 mt-[90px] bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
                        <div>
                            <label htmlFor="search">Search Product</label>
                            <input
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full h-[32px]"
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="option">Select Category</label>
                            <select
                                id="option"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="select select-bordered w-full select-xs font-[700] h-[32px]"
                            >
                                <option value="" disabled >All</option>
                                <option>Tables</option>
                                <option>Chairs</option>
                                <option>Kids</option>
                                <option>Sofas</option>
                                <option>Beds</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sortOrder">Select Company</label>
                            <input
                                id="sortOrder"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="input input-bordered w-full h-[32px]"
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="sortOrder">Sort By</label>
                            <select
                                id="sortOrder"
                                value={cartby}
                                onChange={(e) => setCartby(e.target.value)}
                                className="select select-bordered w-full font-[700] select-xs h-[32px]"
                            >
                                <option value="" disabled >a-z</option>
                                <option>a-z</option>
                                <option>z-a</option>
                                <option>high</option>
                                <option>low</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="priceRange" className='text-[14px] flex justify-between font-[600]'>
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
                                className="range range-primary range-sm"
                            />
                            <label htmlFor="priceRange" className='text-[13px] flex justify-between font-[600]'>
                                <span>0</span>
                                <span>Max: $1,000.00</span>
                            </label>
                        </div>
                        <div className='flex flex-col items-center'>
                            <label htmlFor="checkbox">Free shipping</label>
                            <input
                                onChange={() => setIsChecked(!isChecked)} 
                                type="checkbox" 
                                name="shipping" 
                                className="mt-2 checkbox checkbox-primary checkbox-sm"
                                checked={isChecked}
                            />
                        </div>
                        <button
                            type='button'
                            onClick={filterlash}
                            className='btn btn-sm btn-primary'
                        >
                            Filter
                        </button>
                        <button
                            type='button'
                            onClick={tozalash}
                            className='btn btn-sm btn-secondary'
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <div className='bg-base-200 my-7 py-3 rounded-[8px] flex justify-between max-w-[1100px] mx-auto drop-shadow-lg'>
                    <p className='text-[20px] font-[600] mx-[20px]'>{malumod.length} Products</p>
                </div>
                <div className='pt-10 flex flex-wrap justify-between max-w-[1100px] mx-auto'>
                    {malumod && malumod.map((e) => (
                        <div key={e.id} className="mt-6  max-w-[250px] flex flex-col justify-between mx-[10px] rounded-[5px] drop-shadow-lg">
                            <div color="blue-gray" className="relative h-56">
                                <img
                                className='w-[245px] h-[200px] rounded-[100%]  p-1 pb-5 drop-shadow-lg'
                                    src={e.image}
                                    alt="card-image"
                                />
                            </div>
                            <div className='flex flex-col justify-between h-[60%]'>
                                <div>
                                    <h2  className="text-[18px] p-2 drop-shadow-lg">
                                        {capitalizeFirstLetter(e.title)}
                                    </h2>
                                    <p className='pl-2 text-[13px] drop-shadow-md tracking-widest'>
                                        {e.description}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className='text-[#3b0cf7]'>${e.price}</p>
                                    <button
                                        className='w-[94%] bg-[#1607eb7f] text-white m-2 rounded-tl-[50%] rounded-br-[50%] rounded-[5px] drop-shadow-lg hover:bg-[#1607eb] hover:text-[#0be0ef] transition hover:-translate-y-1'
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Produkt;
