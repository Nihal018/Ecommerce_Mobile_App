import { useReducer, createContext, useEffect, useContext } from "react";

import { FavouriteItem } from "../models/FavouriteItem";
import { AuthContext } from "./auth-context";
import { firebaseServices } from "../util/firebaseSDK";
export const FavouriteContext = createContext({
  favouriteItems: [] as FavouriteItem[],
  addFavouriteItem: (details: { userId: string; itemId: string }) => {},
  deleteFavouriteItem: (details: { userId: string; itemId: string }) => {},
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
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchAllItems() {
      const temp = await firebaseServices.getFavourites(authCtx.userId);
      dispatch({
        type: "INIT",
        payload: {
          FavouriteItems: temp,
        },
      });
    }

    if (authCtx.isAuthenticated) fetchAllItems();
    else {
      dispatch({
        type: "INIT",
        payload: {
          FavouriteItems: [],
        },
      });
    }
  }, []);

  async function addFavouriteItem({
    userId,
    itemId,
  }: {
    userId: string;
    itemId: string;
  }) {
    await firebaseServices.addToFavourites(userId, itemId);

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

  async function deleteFavouriteItem({
    userId,
    itemId,
  }: {
    userId: string;
    itemId: string;
  }) {
    await firebaseServices.removeFromFavourites(userId, itemId);
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
