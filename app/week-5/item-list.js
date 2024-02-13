"use client";

import { useState } from "react";
import Item from "./item";
import Items from "./items.json";

export default function ItemList() {
    const [sortBy, setSortBy] = useState("name");
    
    Items.sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        } 
        // else if (sortBy === "groupedCategory") {
        //     return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        // }
        
    })

    return (
        <div >
            <label for="sort">Sort by: </label>

            <button className="bg-orange-700 p-1 m-2 w-28 focus:bg-orange-500" onClick={() => setSortBy("name")}>Name</button>
            <button className="bg-orange-700 p-1 m-2 w-28 focus:bg-orange-500" onClick={() => setSortBy("category")}>Category</button>
            {/* <button className="bg-orange-700 p-1 m-2 w-28 focus:bg-orange-500" onClick={() => setSortBy("groupedCategory")}>Grouped Category</button> */}
            
            <ul>
                {Items.map((item, id) => {
                    return <Item key={id} name={item.name} quantity={item.quantity} category={item.category} />
                })}
            </ul>

        </div>
    )
}