"use client";

import { useState } from "react";

export default function NewItem() {
    const [name, setName] = useState("Item name");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");

    function handleSubmit(event) {
        event.preventDefault();
        const item = { name, quantity, category };
        console.log(item);
        alert(JSON.stringify(item));
        setName("Item name");
        setQuantity(1);
        setCategory("produce");
    }

    return (
        <div className="mb-2">
            <form className="p-2 m-4 bg-slate-500 text-black max-w-sm w-full" onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
                    />
                </div>                
                <div className="flex justify-between">
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                        min="1"
                        max="99"
                        required
                        className="w-20 ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
                    />                
                    <select 
                        id="category" 
                        value={category} 
                        onChange={(event) => setCategory(event.target.value)}
                        className="ml-1 border-2 borer-gray-300 p-2 rounded-lg font-sans"
                    >
                        <option value disabled>Category</option>
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen">Frozen Foods</option>
                        <option value="canned">Canned Goods</option>
                        <option value="dry">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                        
                    </select>
                </div>
                <button 
                    type="submit"
                    className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    +
                </button>
            </form>
        </div>
    );
}