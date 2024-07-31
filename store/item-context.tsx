import {
  useReducer,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { Item } from "../models/Item";
import { AuthContext } from "./auth-context";
import { firebaseServices } from "../util/firebaseSDK";
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
  userCreatedItems: [] as Item[],
  addItem: (details: {
    name: string;
    cost: number;
    imageUri: string;
    description: string;
    category: string;
    vendorId: string;
  }) => {},
  updateItem: (item: Item) => {},
  deleteItem: (itemId: string) => {},
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
        itemId: string;
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
  const [userCreatedItems, setUserCreatedItems] = useState<Item[]>(
    [] as Item[]
  );

  // const [userCreatedItems, setUserCreatedItems] = useState([] as Item[]);
  const authCtx = useContext(AuthContext);
  authCtx.userId;

  useEffect(() => {
    async function fetchAllItems() {
      const temp = await firebaseServices.getAllItems();
      dispatch({
        type: "INIT",
        payload: {
          items: temp,
        },
      });

      if (authCtx.userId !== "") {
        const createdItems = temp.filter(
          (item) => item.vendorId === authCtx.userId
        );

        setUserCreatedItems(createdItems);
      }
    }

    fetchAllItems();
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
    vendorId: string;
  }) {
    const newItem = await firebaseServices.createItem({
      name: name.trim(),
      cost: cost,
      imageUri: imageUri.trim(),
      description: description.trim(),
      category: category.trim(),
      vendorId: vendorId,
    });

    dispatch({
      type: "ADD",
      payload: {
        item: newItem,
      },
    });
  }

  // updateItem function will be called only by the user who has created i.e the one whose id  == vendorId

  const updateItem = async (item: Item) => {
    await firebaseServices.updateItem(item);

    dispatch({
      type: "UPDATE",
      payload: { item: item },
    });
  };

  async function deleteItem(itemId: string) {
    firebaseServices.deleteItem(itemId);

    dispatch({ type: "DELETE", payload: { itemId: itemId } });
  }

  const value = {
    items: itemsState,
    userCreatedItems: userCreatedItems,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}

export default ItemsContextProvider;
