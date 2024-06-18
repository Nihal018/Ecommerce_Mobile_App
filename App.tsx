import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Browse from "./screens/BrowseOverview/Browse";
import Favourites from "./screens/Favourites";
import Cart from "./screens/Cart";
import Profile from "./screens/ProfileScreens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import All from "./screens/HomeOverview/All";
import Audio from "./screens/HomeOverview/Audio";
import Drones from "./screens/HomeOverview/Drones";
import Gaming from "./screens/HomeOverview/Furniture";
import PC from "./screens/HomeOverview/PC";
import Video from "./screens/HomeOverview/Sports";
import { createStackNavigator } from "@react-navigation/stack";
import ItemCategory from "./screens/BrowseOverview/ItemCategory";
import ItemDetails from "./screens/BrowseOverview/ItemDetails";
import SignUp from "./screens/AuthScreens/SignUp";
import Login from "./screens/AuthScreens/Login";
import { useContext, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import ItemsContextProvider from "./store/item-context";
import UsersContextProvider, { UsersContext } from "./store/user-context";
import MyProducts from "./screens/ProfileScreens/MyProducts";
import PastPurchases from "./screens/ProfileScreens/PastPurchases";
import AddProduct from "./screens/ProfileScreens/AddProduct";
import CartItemsContextProvider from "./store/cart-context";
import FavouriteItemsContextProvider from "./store/favourite-context";
import EditProduct from "./screens/ProfileScreens/EditProduct";
import Sports from "./screens/HomeOverview/Sports";
import Furniture from "./screens/HomeOverview/Furniture";

const bottomTab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();

async function init(db: SQLiteDatabase) {
  await db.execAsync("PRAGMA journal_mode = WAL");
  await db.execAsync("PRAGMA foreign_keys = ON");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Users(
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT ,
        email TEXT NOT NULL,
        firebaseId TEXT NOT NULL
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

  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS FavouriteItems(
          userId INTEGER NOT NULL,
          itemId INTEGER NOT NULL,
          FOREIGN KEY(userId) REFERENCES Users(id) ON DELETE CASCADE,
          FOREIGN KEY(itemId) REFERENCES Items(id) ON DELETE CASCADE,
          PRIMARY KEY(userId, itemId) 

      )`);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS CartItems(
            userId INTEGER NOT NULL,
            itemId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES Users(id) ON DELETE CASCADE,
            FOREIGN KEY(itemId) REFERENCES Items(id) ON DELETE CASCADE,
            PRIMARY KEY(userId, itemId) 
        )`);
}

function ProfileScreens() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={Profile} options={{}} />
      <ProfileStack.Screen
        name="MyProducts"
        component={MyProducts}
        options={{ headerTitle: "My Products" }}
      />
      <ProfileStack.Screen
        name="PastPurchases"
        component={PastPurchases}
        options={{ headerTitle: "Past Purchases" }}
      />
      <ProfileStack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerTitle: "Add Products" }}
      />
      <ProfileStack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{ headerTitle: "Edit Products" }}
      />
    </ProfileStack.Navigator>
  );
}

function AuthScreens() {
  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{}}>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitleStyle: {
            marginLeft: 15,
          },
        }}
      />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <topTab.Navigator
      initialRouteName="All"
      style={{
        backgroundColor: "white",
      }}
      screenOptions={{
        tabBarInactiveTintColor: "grey",

        tabBarActiveTintColor: "black",
        tabBarIndicatorStyle: {
          backgroundColor: "black", // Black bottom border for focused tab
          height: 3, // Height of the bottom border
        },
        tabBarAndroidRipple: { borderless: true },
        tabBarItemStyle: {
          width: 90,
        },
        tabBarStyle: {
          backgroundColor: "white", // Background color of the tab bar
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },

        tabBarScrollEnabled: true,
        tabBarGap: 10,
        tabBarAllowFontScaling: true,
      }}
    >
      <topTab.Screen name="All" component={All} options={{}} />
      <topTab.Screen name="Audio" component={Audio} options={{}} />
      <topTab.Screen name="Drones" component={Drones} options={{}} />

      <topTab.Screen name="Furniture" component={Furniture} options={{}} />
      <topTab.Screen name="Laptops" component={PC} options={{}} />
      <topTab.Screen name="Sports" component={Sports} options={{}} />
    </topTab.Navigator>
  );
}

function BrowseOverview() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Browse"
        component={Browse}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ItemCategory" component={ItemCategory} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UsersContext);
  const user = userCtx.users.find((user) => user.id === authCtx.userId);
  let title = "Hello ";
  if (user) {
    title = title + user.name;
  } else {
    title = title + "There";
  }

  return (
    <ItemsContextProvider>
      <CartItemsContextProvider>
        <FavouriteItemsContextProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <bottomTab.Navigator
              initialRouteName="HomeTabs"
              screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "grey",
                tabBarLabelPosition: "below-icon",
                tabBarHideOnKeyboard: true,
              }}
            >
              <bottomTab.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <Ionicons name="home-outline" size={size} color={color} />
                    );
                  },
                  headerTitleStyle: {
                    marginLeft: 20,
                  },

                  tabBarLabel: "Home",
                  headerTitle: `${title}`,
                  headerStyle: {
                    height: 90, // Set the custom height for the header
                    backgroundColor: "white",
                  },
                }}
              />
              <bottomTab.Screen
                name="BrowseOverview"
                component={BrowseOverview}
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <AntDesign name="search1" size={size} color={color} />
                    );
                  },
                  tabBarLabel: "Browse",
                  headerShown: false,
                }}
              />
              <bottomTab.Screen
                name="Favourites"
                component={Favourites}
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <AntDesign name="hearto" size={size} color={color} />
                    );
                  },
                  tabBarLabel: "Favourites",
                  headerTitleAlign: "center",
                }}
              />
              <bottomTab.Screen
                name="Cart"
                component={Cart}
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <AntDesign
                        name="shoppingcart"
                        size={size}
                        color={color}
                      />
                    );
                  },
                  tabBarLabel: "Cart",
                  headerTitleAlign: "center",
                }}
              />
              {authCtx.isAuthenticated && (
                <bottomTab.Screen
                  name="ProfileScreens"
                  component={ProfileScreens}
                  options={{
                    tabBarIcon: ({ color, size }) => {
                      return (
                        <Ionicons
                          name="person-outline"
                          size={size}
                          color={color}
                        />
                      );
                    },
                    headerShown: false,
                    tabBarLabel: "Profile",
                  }}
                />
              )}
              {!authCtx.isAuthenticated && (
                <bottomTab.Screen
                  name="AuthScreens"
                  component={AuthScreens}
                  options={{
                    headerShown: false,
                    tabBarLabel: "Login",
                    tabBarIconStyle: { display: "none" },
                  }}
                />
              )}
            </bottomTab.Navigator>
          </NavigationContainer>
        </FavouriteItemsContextProvider>
      </CartItemsContextProvider>
    </ItemsContextProvider>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="Mobile1.db" onInit={init}>
      <UsersContextProvider>
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
      </UsersContextProvider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
