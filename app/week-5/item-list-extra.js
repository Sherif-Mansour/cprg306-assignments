"use client";

import { useState } from "react";
import Item from "./item";
import Items from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  const groupedItems = Items.reduce((grouped, item) => {
    const { category } = item;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(item);
    return grouped;
  }, {});

  const handleSortChange = (sortByValue) => {
    setSortBy(sortByValue);
  };

  const handleGroupedCategorySort = () => {
    setSortBy("groupedCategories");
  };

  const renderItems = () => {
    if (sortBy === "groupedCategories") {
      return renderItemsByCategory();
    } else {
      return Items.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
          return a.category.localeCompare(b.category);
        }
      }).map((item) => (
        <Item
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          category={item.category}
        />
      ));
    }
  };

  const renderItemsByCategory = () => {
    return Object.keys(groupedItems).map((category) => (
      <div key={category}>
        <h2 className="capitalize text-2xl">{category}</h2>
        <ul>
          {groupedItems[category].map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>

      <button
        className="bg-orange-700 p-1 m-2 w-28 focus:bg-orange-500"
        onClick={() => handleSortChange("name")}
      >
        Name
      </button>
      <button
        className="bg-orange-700 p-1 m-2 w-28 focus:bg-orange-500"
        onClick={() => handleSortChange("category")}
      >
        Category
      </button>
      <button
        className="bg-orange-700 p-1 m-2 w-28 focus:bg-orange-500"
        onClick={handleGroupedCategorySort}
      >
        Grouped Category
      </button>
      {renderItems()}
    </div>
  );
}
