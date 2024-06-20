import * as SQLite from "expo-sqlite";

import { useReducer, createContext, useEffect } from "react";
import { Item } from "../models/Item";
import { useSQLiteContext } from "expo-sqlite";

// async function convertImageToBase64(uri:string) {
//   const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
//   return base64;
// }

// function storeImage(base64String:string) {
//   db.transaction(tx => {
//     tx.executeSql('INSERT INTO images (image) VALUES (?);', [base64String]);
//   });
// }

// function getImage(callback) {
//   db.transaction(tx => {
//     tx.executeSql('SELECT * FROM images;', [], (_, { rows }) => {
//       if (rows.length > 0) {
//         const base64String = rows.item(0).image;
//         callback(base64String);
//       }
//     });
//   });
// }

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
    async function fetchAllItems() {
      const temp = await db.getAllAsync<Item>("SELECT * FROM Items ");
      dispatch({
        type: "INIT",
        payload: {
          items: temp,
        },
      });
    }
    fetchAllItems();
  }, [db]);

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
      [
        name.trim(),
        cost,
        imageUri.trim(),
        description.trim(),
        category.trim(),
        vendorId,
      ]
    );
    console.log(result);
    if (result.changes > 0) {
      dispatch({
        type: "ADD",
        payload: {
          item: {
            name: name.trim(),
            cost: cost,
            imageUri: imageUri.trim(),
            description: description.trim(),
            category: category.trim(),
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
