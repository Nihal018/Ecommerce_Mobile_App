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
import Gaming from "./screens/HomeOverview/Gaming";
import PC from "./screens/HomeOverview/PC";
import Video from "./screens/HomeOverview/Video";
import { createStackNavigator } from "@react-navigation/stack";
import ItemCategory from "./screens/BrowseOverview/ItemCategory";
import ItemDetails from "./screens/BrowseOverview/ItemDetails";
import SignUp from "./screens/AuthScreens/SignUp";
import Login from "./screens/AuthScreens/Login";
import { useContext, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { SQLiteProvider } from "expo-sqlite";
import ItemsContextProvider, { init } from "./store/item-context";
import UsersContextProvider from "./store/user-context";
import MyProducts from "./screens/ProfileScreens/MyProducts";
import PastPurchases from "./screens/ProfileScreens/PastPurchases";

const bottomTab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function ProfileScreens() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={Profile} options={{}} />
      <ProfileStack.Screen name="MyProducts" component={MyProducts} />
      <ProfileStack.Screen name="PastPurchases" component={PastPurchases} />
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

      <topTab.Screen name="Gaming" component={Gaming} options={{}} />
      <topTab.Screen name="PC" component={PC} options={{}} />
      <topTab.Screen name="Video" component={Video} options={{}} />
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

  return (
    <SQLiteProvider databaseName="Ecommerce.db" onInit={init}>
      <UsersContextProvider>
        <ItemsContextProvider>
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
                  headerTitle: "Hello XYZ",
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
        </ItemsContextProvider>
      </UsersContextProvider>
    </SQLiteProvider>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
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
