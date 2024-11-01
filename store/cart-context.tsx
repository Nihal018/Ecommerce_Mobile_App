import { useReducer, createContext, useEffect, useContext } from "react";

import { CartItem } from "../models/CartItem";
import { firebaseServices } from "../util/firebaseSDK";
import { AuthContext } from "./auth-context";
export const CartContext = createContext({
  cartItems: [] as CartItem[],
  addCartItem: (details: { userId: string; itemId: string }) => {},
  deleteCartItem: (details: { userId: string; itemId: string }) => {},
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
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchAllItems() {
      const temp = await firebaseServices.getCart(authCtx.userId);
      dispatch({
        type: "INIT",
        payload: {
          CartItems: temp,
        },
      });
    }

    if (authCtx.isAuthenticated) fetchAllItems();
    else {
      dispatch({
        type: "INIT",
        payload: {
          CartItems: [],
        },
      });
    }
  }, []);

  async function addCartItem({
    userId,
    itemId,
  }: {
    userId: string;
    itemId: string;
  }) {
    await firebaseServices.addToCart(userId, itemId);
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

  async function deleteCartItem(cartItem: CartItem) {
    const result = await firebaseServices.removeFromCart(
      cartItem.userId,
      cartItem.itemId
    );

    dispatch({
      type: "DELETE",
      payload: { CartItem: cartItem },
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
