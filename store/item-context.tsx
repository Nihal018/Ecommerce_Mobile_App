import * as SQLite from "expo-sqlite";

import { useReducer, createContext, useEffect } from "react";
import { Item } from "../models/Item";
import { useSQLiteContext } from "expo-sqlite";

export async function init() {
  const db = await SQLite.openDatabaseAsync("Ecommerce.db");
  await db.execAsync("PRAGMA journal_mode = WAL");
  await db.execAsync("PRAGMA foreign_keys = ON");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Users(
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT ,
        email TEXT NOT NULL,
        imageUri TEXT
    )`);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Items(
        id INTEGER PRIMARY KEY NOT NULL,
        description TEXT NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        vendorId INTEGER , 
        cost INTEGER NOT NULL,
        imageUri TEXT ,
        FOREIGN KEY(vendorId) REFERENCES Users(id) ON DELETE CASCADE
    )`);
}

export const ItemsContext = createContext({
  items: [] as Item[],
  addItem: (details: {
    name: string;
    cost: number;
    imageUri: string;
    description: string;
    category: string;
    vendorId: number;
  }) => {},
  updateItem: (item: Item) => {},
  deleteItem: (itemId: number) => {},
});

// Discriminated union
type ItemAction =
  | {
      type: "UPDATE";
      payload: {
        item: Item;
      };
    }
  | {
      type: "ADD";
      payload: {
        item: Item;
      };
    }
  | {
      type: "DELETE";
      payload: {
        itemId: number;
      };
    }
  | {
      type: "INIT";
      payload: {
        items: Item[];
      };
    };

function itemReducer(state: Item[], action: ItemAction): Item[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload.item];

    case "UPDATE":
      const updatedItemIndex = state.findIndex(
        (item: Item) => item.id === action.payload.item.id
      );
      const updatableItems = [...state];
      updatableItems[updatedItemIndex] = action.payload.item;

      return updatableItems;

    case "DELETE":
      const newState = [...state];
      return newState.filter((item: Item) => item.id !== action.payload.itemId);

    case "INIT":
      const allitems = action.payload.items;
      return allitems;

    default:
      return state;
  }
}

function ItemsContextProvider({ children }: { children: React.ReactNode }) {
  const [itemsState, dispatch] = useReducer(itemReducer, [] as Item[]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchAllTasks() {
      const temp = await db.getAllAsync<Item>("SELECT * FROM Items ");
      dispatch({
        type: "INIT",
        payload: {
          items: temp,
        },
      });
    }
    fetchAllTasks();
  }, []);

  async function addItem({
    name,
    cost,
    imageUri,
    description,
    category,
    vendorId,
  }: {
    name: string;
    cost: number;
    imageUri: string;
    description: string;
    category: string;
    vendorId: number;
  }) {
    const result = await db.runAsync(
      "INSERT INTO Items (name,cost,imageUri , description, category, vendorId) VALUES (?,?,?,?,?,?)",
      [name, cost, imageUri, description, category, vendorId]
    );
    console.log(result);
    if (result.changes > 0) {
      dispatch({
        type: "ADD",
        payload: {
          item: {
            name: name,
            cost: cost,
            imageUri: imageUri,
            description: description,
            category: category,
            vendorId: vendorId,
            id: result.lastInsertRowId,
          },
        },
      });
    }
  }

  // updateItem function will be called only by the user who has created i.e the one whose id  == vendorId

  const updateItem = async (item: Item) => {
    const result = await db.runAsync(
      "UPDATE Items SET name = ?, cost = ? , imageUri = ?, description = ?, category = ? WHERE id = ?",
      [
        item.name,
        item.cost,
        item.imageUri,
        item.description,
        item.category,
        item.id,
      ]
    );
    if (result.changes > 0) {
      dispatch({
        type: "UPDATE",
        payload: { item: item },
      });
    }
  };

  async function deleteItem(itemId: number) {
    const result = await db.runAsync("DELETE FROM Items WHERE id = ?", [
      itemId,
    ]);
    console.log(result);

    if (result.changes > 0)
      dispatch({ type: "DELETE", payload: { itemId: itemId } });
  }

  const value = {
    items: itemsState,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}

export default ItemsContextProvider;
