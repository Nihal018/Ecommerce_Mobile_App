import { useReducer, createContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { FavouriteItem } from "../models/FavouriteItem";
export const FavouriteContext = createContext({
  favouriteItems: [] as FavouriteItem[],
  addFavouriteItem: (details: { userId: number; itemId: number }) => {},
  deleteFavouriteItem: (details: { userId: number; itemId: number }) => {},
});

// Discriminated union
type ItemAction =
  | {
      type: "ADD";
      payload: {
        FavouriteItem: FavouriteItem;
      };
    }
  | {
      type: "DELETE";
      payload: {
        FavouriteItem: FavouriteItem;
      };
    }
  | {
      type: "INIT";
      payload: {
        FavouriteItems: FavouriteItem[];
      };
    };

function itemReducer(
  state: FavouriteItem[],
  action: ItemAction
): FavouriteItem[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload.FavouriteItem];

    case "DELETE":
      const newState = [...state];
      return newState.filter(
        (item: FavouriteItem) =>
          item.itemId !== action.payload.FavouriteItem.itemId ||
          item.userId !== action.payload.FavouriteItem.userId
      );

    case "INIT":
      const allitems = action.payload.FavouriteItems;
      return allitems;

    default:
      return state;
  }
}

function FavouriteItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [itemsState, dispatch] = useReducer(itemReducer, [] as FavouriteItem[]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchAllItems() {
      const temp = await db.getAllAsync<FavouriteItem>(
        "SELECT * FROM FavouriteItems "
      );
      dispatch({
        type: "INIT",
        payload: {
          FavouriteItems: temp,
        },
      });
    }
    fetchAllItems();
  }, []);

  async function addFavouriteItem({
    userId,
    itemId,
  }: {
    userId: number;
    itemId: number;
  }) {
    const result = await db.runAsync(
      "INSERT INTO FavouriteItems (userId,itemId) VALUES (?,?)",
      [userId, itemId]
    );
    console.log(result);
    if (result.changes > 0) {
      dispatch({
        type: "ADD",
        payload: {
          FavouriteItem: {
            userId: userId,
            itemId: itemId,
          },
        },
      });
    }
  }

  async function deleteFavouriteItem({
    userId,
    itemId,
  }: {
    userId: number;
    itemId: number;
  }) {
    const result = await db.runAsync(
      "DELETE FROM FavouriteItems WHERE userId = ? AND itemId = ?",
      [userId, itemId]
    );
    console.log(result);

    if (result.changes > 0)
      dispatch({
        type: "DELETE",
        payload: { FavouriteItem: { userId: userId, itemId: itemId } },
      });
  }

  const value = {
    favouriteItems: itemsState,
    addFavouriteItem: addFavouriteItem,
    deleteFavouriteItem: deleteFavouriteItem,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteItemsContextProvider;
