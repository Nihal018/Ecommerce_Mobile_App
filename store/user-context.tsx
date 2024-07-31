import { useReducer, createContext, useEffect } from "react";
import { User } from "../models/User";
import { firebaseServices } from "../util/firebaseSDK";

export const UsersContext = createContext({
  users: [] as User[],
  updateUser: (user: User) => {},
  deleteUser: (userId: string) => {},
});

type UserAction =
  | {
      type: "UPDATE";
      payload: {
        user: User;
      };
    }
  | {
      type: "DELETE";
      payload: {
        userId: string;
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

  useEffect(() => {
    async function fetchUsers() {
      const temp = await firebaseServices.getAllUsers();
      dispatch({
        type: "INIT",
        payload: {
          users: temp,
        },
      });
    }

    fetchUsers();
  }, []);

  async function updateUser(user: User) {
    await firebaseServices.updateUser(user);

    dispatch({
      type: "UPDATE",
      payload: { user: user },
    });
  }

  async function deleteUser(userId: string) {
    await firebaseServices.deleteUser(userId);

    dispatch({
      type: "DELETE",
      payload: { userId: userId },
    });
  }

  const value = {
    users: usersState,
    updateUser: updateUser,
    deleteUser: deleteUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export default UsersContextProvider;
