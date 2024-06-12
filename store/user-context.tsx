import * as SQLite from "expo-sqlite";

import { useReducer, createContext, useEffect } from "react";
import { User } from "../models/User";
import { useSQLiteContext } from "expo-sqlite";

export const UsersContext = createContext({
  users: [] as User[],
  addUser: (details: {
    name: string;
    description: string;
    email: string;
  }) => {},
  updateUser: (user: User) => {},
  deleteUser: (userId: number) => {},
});

type UserAction =
  | {
      type: "UPDATE";
      payload: {
        user: User;
      };
    }
  | {
      type: "ADD";
      payload: {
        user: User;
      };
    }
  | {
      type: "DELETE";
      payload: {
        userId: number;
      };
    }
  | {
      type: "INIT";
      payload: {
        users: User[];
      };
    };

function userReducer(state: User[], action: UserAction): User[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload.user];

    case "UPDATE":
      const updatedUserIndex = state.findIndex(
        (user: User) => user.id === action.payload.user.id
      );
      const updatableusers = [...state];
      updatableusers[updatedUserIndex] = action.payload.user;

      return updatableusers;

    case "DELETE":
      const newState = [...state];
      return newState.filter((user: User) => user.id !== action.payload.userId);

    case "INIT":
      const allusers = action.payload.users;
      return allusers;

    default:
      return state;
  }
}

function UsersContextProvider({ children }: { children: React.ReactNode }) {
  const [usersState, dispatch] = useReducer(userReducer, [] as User[]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchUsers() {
      const temp = await db.getAllAsync<User>("SELECT * FROM Users ");
      dispatch({
        type: "INIT",
        payload: {
          users: temp,
        },
      });
    }

    fetchUsers();
  }, []);

  async function addUser({
    name,
    description,
    email,
  }: {
    name: string;
    description: string;
    email: string;
  }) {
    const result = await db.runAsync(
      "INSERT INTO Users (name , description, email) VALUES (?,?,?)",
      [name, description, email]
    );
    console.log(result);

    if (result.changes > 0) {
      dispatch({
        type: "ADD",
        payload: {
          user: {
            name: name,
            description: description,
            email: email,
            id: result.lastInsertRowId,
          },
        },
      });
    }
  }

  async function updateUser(user: User) {
    const result = await db.runAsync(
      "UPDATE Users SET name = ?,  description = ?, email = ? WHERE id = ?",
      [user.name, user.description, user.email, user.id]
    );

    if (result.changes > 0) {
      dispatch({
        type: "UPDATE",
        payload: { user: user },
      });
    }
  }

  async function deleteUser(userId: number) {
    const result = await db.runAsync("DELETE FROM Users WHERE id = ?", [
      userId,
    ]);

    if (result.changes > 0) {
      dispatch({
        type: "DELETE",
        payload: { userId: userId },
      });
    }
  }

  const value = {
    users: usersState,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export default UsersContextProvider;
