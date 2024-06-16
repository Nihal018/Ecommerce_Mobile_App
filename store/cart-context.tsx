import { useReducer, createContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { CartItem } from "../models/CartItem";
export const CartContext = createContext({
  cartItems: [] as CartItem[],
  addCartItem: (details: { userId: number; itemId: number }) => {},
  deleteCartItem: (details: { userId: number; itemId: number }) => {},
});

// Discriminated union
type ItemAction =
  | {
      type: "ADD";
      payload: {
        CartItem: CartItem;
      };
    }
  | {
      type: "DELETE";
      payload: {
        CartItem: CartItem;
      };
    }
  | {
      type: "INIT";
      payload: {
        CartItems: CartItem[];
      };
    };

function itemReducer(state: CartItem[], action: ItemAction): CartItem[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload.CartItem];

    case "DELETE":
      const newState = [...state];
      return newState.filter(
        (item: CartItem) =>
          item.itemId !== action.payload.CartItem.itemId ||
          item.userId !== action.payload.CartItem.userId
      );

    case "INIT":
      const allitems = action.payload.CartItems;
      return allitems;

    default:
      return state;
  }
}

function CartItemsContextProvider({ children }: { children: React.ReactNode }) {
  const [itemsState, dispatch] = useReducer(itemReducer, [] as CartItem[]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchAllItems() {
      const temp = await db.getAllAsync<CartItem>("SELECT * FROM CartItems");
      dispatch({
        type: "INIT",
        payload: {
          CartItems: temp,
        },
      });
    }
    fetchAllItems();
  }, []);

  async function addCartItem({
    userId,
    itemId,
  }: {
    userId: number;
    itemId: number;
  }) {
    const result = await db.runAsync(
      "INSERT INTO CartItems (userId,itemId) VALUES (?,?)",
      [userId, itemId]
    );
    console.log(result);
    if (result.changes > 0) {
      dispatch({
        type: "ADD",
        payload: {
          CartItem: {
            userId: userId,
            itemId: itemId,
          },
        },
      });
    }
  }

  async function deleteCartItem(CartItem: CartItem) {
    const result = await db.runAsync(
      "DELETE FROM CartItems WHERE itemId = ? AND userId = ?",
      [CartItem.itemId, CartItem.userId]
    );
    console.log(result);

    if (result.changes > 0)
      dispatch({
        type: "DELETE",
        payload: { CartItem: CartItem },
      });
  }

  const value = {
    cartItems: itemsState,
    addCartItem: addCartItem,
    deleteCartItem: deleteCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartItemsContextProvider;
