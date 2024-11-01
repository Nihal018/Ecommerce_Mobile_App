// firebaseServices.tsx

import {
  ref,
  set,
  push,
  get,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { nanoid } from "nanoid";
import { auth, database } from "../firebaseConfig";
import { User } from "../models/User";
import { Item } from "../models/Item";
import { CartItem } from "../models/CartItem";
import { FavouriteItem } from "../models/FavouriteItem";

// Initialize Firebase

const db = database;
// Interfaces

async function generateUniqueItemId(): Promise<string> {
  let id: string;
  let exists: boolean;
  do {
    const timestamp = Date.now();
    const randomString = nanoid(8);
    id = `${timestamp}-${randomString}`;
    const snapshot = await get(ref(db, `items/${id}`));
    exists = snapshot.exists();
  } while (exists);
  return id;
}

// Firebase Services
export const firebaseServices = {
  // Auth operations
  async signUp(
    email: string,
    password: string,
    name: string,
    description: string
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: User = {
      id: userCredential.user.uid,
      name,
      email,
      description,
    };
    await this.createUser(user);
    return user;
  },

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const currentUser = await this.getUser(userCredential.user.uid);
    if (currentUser === null) {
      throw console.error("user doesn't exist in the database");
    }

    return currentUser;
  },

  async logout(): Promise<void> {
    await signOut(auth);
  },

  // User operations
  async createUser(user: User): Promise<void> {
    await set(ref(db, `users/${user.id}`), user);
  },

  async getUser(userId: string): Promise<User | null> {
    const snapshot = await get(ref(db, `users/${userId}`));
    return snapshot.val();
  },
  async getAllUsers(): Promise<User[]> {
    const snapshot = await get(ref(db, "users"));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  },

  async updateUser(user: User): Promise<void> {
    await set(ref(db, `users/${user.id}`), user);
  },

  async deleteUser(userId: string): Promise<void> {
    await remove(ref(db, `users/${userId}`));
  },

  // Item operations
  async createItem(item: Omit<Item, "id">): Promise<Item> {
    const id = await generateUniqueItemId();
    const newItem: Item = { ...item, id };
    await set(ref(db, `items/${id}`), newItem);
    return newItem;
  },

  async getItem(itemId: string): Promise<Item | null> {
    const snapshot = await get(ref(db, `items/${itemId}`));
    return snapshot.val();
  },
  async getAllItems(): Promise<Item[]> {
    const snapshot = await get(ref(db, "items"));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  },

  async updateItem(item: Item): Promise<void> {
    await set(ref(db, `items/${item.id}`), item);
  },

  async deleteItem(itemId: string): Promise<void> {
    await remove(ref(db, `items/${itemId}`));
  },

  async getItemsByCategory(category: string): Promise<Item[]> {
    const itemsRef = ref(db, "items");
    const itemsQuery = query(
      itemsRef,
      orderByChild("category"),
      equalTo(category)
    );
    const snapshot = await get(itemsQuery);
    return Object.values(snapshot.val() || {});
  },

  // Cart operations
  async addToCart(userId: string, itemId: string): Promise<string> {
    const cartItemRef = push(ref(db, `cartItems/${userId}`));
    const cartItem: CartItem = { userId, itemId };
    await set(cartItemRef, cartItem);
    return cartItemRef.key as string;
  },

  async removeFromCart(userId: string, cartItemId: string): Promise<void> {
    await remove(ref(db, `cartItems/${userId}/${cartItemId}`));
  },

  async getCart(userId: string): Promise<CartItem[]> {
    const snapshot = await get(ref(db, `cartItems/${userId}`));
    return Object.values(snapshot.val() || {});
  },

  // Favourite operations
  async addToFavourites(userId: string, itemId: string): Promise<string> {
    const favouriteItemRef = push(ref(db, `favouriteItems/${userId}`));
    const favouriteItem: FavouriteItem = { userId, itemId };
    await set(favouriteItemRef, favouriteItem);
    return favouriteItemRef.key as string;
  },

  async removeFromFavourites(
    userId: string,
    favouriteItemId: string
  ): Promise<void> {
    await remove(ref(db, `favouriteItems/${userId}/${favouriteItemId}`));
  },

  async getFavourites(userId: string): Promise<FavouriteItem[]> {
    const snapshot = await get(ref(db, `favouriteItems/${userId}`));
    return Object.values(snapshot.val() || {});
  },
};
