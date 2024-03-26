"use client";

import { useEffect, useState } from "react";
import {
  getItems,
  addItem,
  deleteItem,
} from "../_services/shopping-list-service";

import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  const loadItems = async () => {
    try {
      if (!user || !user.uid) {
        console.error("User is not authenticated.");
        return;
      }

      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error loading items: ", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []); // Empty dependency array to execute only on component mount

  const handleAddItem = async (item) => {
    try {
      // Add the item to the database and get the generated ID
      const newItemId = await addItem(user.uid, item);

      // Set the ID of the new item
      item.id = newItemId;

      // Update the state to include the new item
      setItems([...items, item]);
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(user.uid, itemId);
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
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
          <ItemList
            items={items}
            onSelect={handleItemSelect}
            onDelete={handleDeleteItem}
          />
        </div>
        <div className="flex-1 max-w-sm m-2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
