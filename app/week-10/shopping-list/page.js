"use client";

import { useState, useEffect } from "react";

import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  const handleAddItem = async (item) => {
    const id = await addItem(user.uid, item);
    item.id = id;
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

  async function loadItems() {
    const items = await getItems(user.uid);
    setItems(items);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

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
