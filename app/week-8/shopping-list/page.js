"use client";

import { useState } from "react";

import ItemList from "./item-list";
import NewItem from "./new-item";
import ItemsData from "./items.json";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const [items, setItems] = useState(ItemsData);
  const [selectedItemName, setSelectedItemName] = useState(null);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleItemSelect = (item) => {
    const cleanedName = item
      .split(",")[0]
      .trim()
      .replace(/[^\w\s]/gi, "");
    console.log("Selected item: ", item);
    setSelectedItemName(cleanedName);
  };

  return (
    <main>
      <h1 className="text-3xl font-bold m-2">Shopping List</h1>
      <div className="flex">
        <div className="flex-1 max-w-sm m-2">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onSelect={handleItemSelect} />
        </div>
        <div className="flex-1 max-w-sm m-2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
