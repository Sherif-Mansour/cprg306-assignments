// Import necessary functions and objects from Firebase Firestore module
import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Function to retrieve all items for a specific user from Firestore
export const getItems = async (userId) => {
  // Initialize an empty array to store items
  const items = [];

  try {
    // Query the items collection for documents associated with the userId
    const q = query(collection(db, "users/${userId}/items"));

    // Fetch the documents in the items collection
    const querySnapshot = await getDocs(q);

    // Iterate through the documents and add them to the items array
    querySnapshot.forEach((doc) => {
      // Add an object to the items array containing the document Id and data
      items.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching items: ", error);
  }

  // Return the items array
  return items;
};

// Function to add a new item toa  specific user's list of items in Firestore
export const addItem = async (userId, item) => {
  try {
    // Reference the items subcollection of a document in the users collection using userId
    const itemsCollectionRef = collection(db, "users/${userId}/items");

    // Add the item to the items subcollection
    const docRef = await addDoc(itemsCollectionRef, item);

    // Return the id of the newly created document
    return docRef.id;
  } catch (error) {
    console.error("Error adding item: ", error);
    return null;
  }
};

// Function to delete an item from a specific user's list of items in Firestore
export const deleteItem = async (userId, itemId) => {
  try {
    // Reference the specific item document using userId and itemId
    const itemRef = doc(collection(db, `users/${userId}/items`), itemId);

    // Delete the item document
    await deleteDoc(itemRef);

    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item: ", error);
    return null;
  }
};
